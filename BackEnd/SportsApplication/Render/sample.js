const render= async (req,res) =>{
    console.log('GET request received at /api/log');
    return res.status(200).json({ message: "Server Started successfully"});
}

module.exports = render;