const Carrer = require('../models/carrer');

exports.getCarrers = async(req, res) => {
    try {
        const careers = await Carrer.findAll();
        res.json(careers);
    } catch(err){
        res.status(500).json({status: false, message: 'Internal Server Error'});
    }
}

exports.getCareerById = async(req, res) => {
    const playerId = req.params.id;
    try{
        const  carrer = await Carrer.findByPk(playerId);
        res.json({status: true, ...carrer.dataValues});
    } catch(err) {
        res.status(500).json({status: false, message: 'Internal Server Error'});
    }
}

exports.postCarrer = async(req, res) => {
    const {name, dob, imageUrl, birthPlace, careerDesc, matches, score, fifties, centuries, wickets, average} = req.body;

    try {
        const carrer = await Carrer.create({name, dob, imageUrl, birthPlace, careerDesc, matches, score, fifties, centuries, wickets, average});
        res.json({status: true, ...carrer.dataValues});
    } catch(err) {
        console.log(err);
        res.status(500).json({status: false, message: 'Internal Server Error'});
    }
}

exports.updateCarrer = async(req, res) => {
    const playerId = req.params.id;
    const {name, dob, imageUrl, birthPlace, careerDesc, matches, score, fifties, centuries, wickets, average} = req.body;
    const obj = {name, dob, imageUrl, birthPlace, careerDesc, matches, score, fifties, centuries, wickets, average};

    try{
        const rowsAffected = await Carrer.update(obj,
            {
                where: {
                    id: playerId
                }
            }
        )
        if(rowsAffected>0){
            res.json({status: true, ...obj});
        } else {
            res.status(404).json({status: false, message: 'Cricketer Not Found'});
        }
    } catch(err) {
        res.status(500).json({status: false, message: 'Internal Server Error'});
    }
}