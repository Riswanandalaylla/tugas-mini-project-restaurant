const categoriesModel = require("../models/categoriesModel");

const categoriesController = {}
categoriesController.getAll = (req,res) => {
    const categories = categoriesModel.getAll((err,rows) => {
        if(err){
            throw err
        }else {
            res.json({
                data : rows
            })
        }
    });
    
}
categoriesController.getById = (req,res) => {
    const {id} = req.params
    const category = categoriesModel.findById(id,(err,rows) => {
        if(err){
            throw err
        }else {
            res.json({
                data : rows
            })
        }
    })
    
}
categoriesController.create = (req,res) => {
    try {
        const createCategories = categoriesModel.create(req.body)
        return res.json({
            message : "Data berhasil ditambahkan !"
        })
    } catch (error) {
        return res.json({
            message : error.message
        })
    }
   
}
categoriesController.update = (req,res) => {
    try {
        const updateCategories = categoriesModel.update(req.params.id,req.body,(err,rows) => {
            if(err){
                throw err
            }else {
                return res.json({
                    message : "Data berhasil diupdate !"
                })
            }
        })
        
    } catch (error) {
        return res.json({
            message : error.message
        })
    }
}
categoriesController.delete = (req,res) => {
    try {
        const deleteCategories = categoriesModel.delete(req.params.id,(err,rows) => {
            if(err){
                throw err
            }else {
                return res.json({
                    message : "Data berhasil dihapus!"
                })
            }
        })
        
    } catch (error) {
        return res.json({
            message : error.message
        })
    }
}
module.exports = categoriesController