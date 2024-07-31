// [GET] /admin/products


const Product = require("../../models/product.model")

module.exports.products = async (req, res) => { 
    const filtersStatus = [
        {
            name: "Tất cả",
            status: "",
            class: ""
        },
        {
            name: "Hoạt động",
            status: "active",
            class: ""
        },
        {
            name: "Dừng hoạt động",
            status: "inactive",
            class: ""
        }
    ]

    const currentStatus = req.query.status
    if (currentStatus){
        const index = filtersStatus.findIndex(item => item.status == currentStatus)
        filtersStatus[index].class = "active"
    }
    else filtersStatus[0].class = "active"
    

    let find = {
        deleted: false,
    }
    if (currentStatus)
        find.status = currentStatus

    const products = await Product.find(find)
    // console.log(products)

    res.render("admin/pages/products/index.pug", {
        pageTitle: "Trang sản phẩm",
        products: products,
        filtersStatus: filtersStatus
    })
}