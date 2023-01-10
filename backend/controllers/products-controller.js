export const getProducts = async (req, res) => {
    console.log(true);
    try {
        res.status(200).json({ message: "success" });
        console.log("success");
    } catch (error) {
        res.status(404).json({ message: "request error" });
        console.log("error");
    }
};
