const Product = require('../model/Product')
const shortid = require('shortid')
const slugify = require('slugify')



exports.createProduct  = (req,res) =>{
   // res.status(200).json({file:  req.files, body: req.body});
   const {
       name, price, description ,quantity , category, createdBy
   } = req.body;

   let productPictures =[];

   if(req.files.length >0){
        productPictures = req.files.map(file =>{
           return {img: file.filename}
       });
   }

   const product  = Product({
    name:req.body.name,
    slug:slugify(name),
    price,
    description,
    productPictures,
    category,
    quantity,
    createdBy: req.user.id
});
    product.save(((error, product) =>{
        if(error) return res.status(400).json({ error});
        if(product){
            res.status(201).json({product});
        }
    }))

}