const { usersDb, guidesDb, todosDb } = require("../db")
const Guide = require("../models/guides");
const User = require("../models/users");

const createGuidePage = (req, res) => {
    var locals = {
        title: "Create Guides"
    }
    res.render("guides/create", locals)
}

const createGuides = async (req, res) => {
    console.log("before", req.body);
    const { title, content, notify } = req.body;
    console.log("after", { title, content, notify });

    try {
        // Guide yaratish
        const newGuide = await guidesDb.create(title, content);
        console.log("New guide created:", newGuide);

        // newGuide obyektida _id mavjudligini tekshiramiz
        if (!newGuide || !newGuide._id) {
            throw new Error("Guide _id not found");
        }

        // Notify bo'lsa, todos yaratish
        if (notify) {
            const users = await User.find();
            console.log("Users found:", users);

            const newTodos = users.map((user) => ({
                user_id: user._id,
                guide_id: newGuide._id, // Bu yerda _id dan foydalanamiz
                completed: false
            }));

            console.log("New todos to create:", newTodos);

            await todosDb.createBulk(newTodos);
            req.flash("success", "Tartib hammaga jo'natildi");
        }

        req.flash("success", "Tartib muvaffaqiyatli qo'shildi");
        res.redirect("/guides/list");
    } catch (error) {
        console.error(error);
        req.flash("error", "Server xatosi");
        res.redirect("/guides/list");
    }
};


const listGuide = (req, res) => {
    Guide.find()
        .then(guides => {
            res.render("guides/list", { guides });
        })
        .catch(err => {
            console.error("Error fetching guides:", err);
            res.status(500).send("Error fetching guides");
        });
}

const showGuide = async (req, res, next) => {
    const { id } = req.params
    try {
        const guide = await guidesDb.findById(id)
        if (!guide) {
            return req.flash("error", "Bunday qo'llanma topilmadi");
        }

        res.render('guides/show', { guide, currentUser: req.user });

    } catch (error) {
        next(error);
    }
}

const editGuidePage = async (req, res, next) => {
    const { id } = req.params;

    try {
        const guide = await Guide.findById(id);
        if (!guide) {
            req.flash("error", "Qo'llanma topilmadi");
            return res.redirect("/guides/list");
        }

        res.render("guides/edit", { guide, currentUser: req.user });
    } catch (error) {
        next(error);
        res.redirect("/guides/list");
    }
};

const editGuide = async (req, res, next) => {
    const { id } = req.params;
    const { title, content, notify } = req.body;

    try {
        const guide = await guidesDb.findById(id);

        if (!guide) {
            req.flash("error", "Bunday qo'llanma topilmadi");
            return res.redirect("/guides/list");
        }

        await guidesDb.update(id, title, content);
        if (notify) {
            const users = await User.find();

            const newEdit = users.map((user) => {
                return {
                    user_id: user.id,
                    guide_id: id,
                    completed: false
                }
            })

            todosDb.createBulk(newEdit)
        }

        req.flash("success", "Qo'llanma muvaffaqiyatli tahrirlandi");
        res.redirect("/guides/list");
    } catch (error) {
        next(error);
    }
};

const removeGuide = (req, res) => {
    const { id } = req.params

    const guide = guidesDb.findById(id)

    if (!guide) {
        return res.status(404).send("Delete guide not found")
    }

    guidesDb.remove(id)

    todosDb.removeAllOfGuide(id)

    req.flash("success", "Qo'llanma muvaffaqiyatli o'chirildi")

    res.redirect("/guides/list")
}

module.exports = {
    createGuidePage,
    createGuides,
    listGuide,
    showGuide,
    editGuidePage,
    editGuide,
    removeGuide
}