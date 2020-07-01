module.exports = {
    getHeroes: (req, res) => {
        const db = req.app.get('db');

        db.get_heroes()
        .then(avengers => res.status(200).send(avengers))
        .catch(err => res.status(500).send(err))
    },
    addHero: (req, res) => {
        const {name, superPower} = req.body,
              db = req.app.get('db');

        console.log(req.body)

        db.add_hero({name, superPower})
        .then(() => res.sendStatus(200))
        .catch(err => res.status(500).send(err))
    },
    editPower: (req, res) => {
        const {id} = req.params,
              {superPower} = req.body,
              db = req.app.get('db');

        db.edit_power({superPower, id})
        .then(() => res.sendStatus(200))
        .catch(err => res.status(500).send(err))
    },
    snapHero: (req, res) => {
        const {id} = req.params,
              db = req.app.get('db');

        db.delete_hero(id)
        .then(() => res.sendStatus(200))
        .catch(err => res.status(500).send(err))
    }
}