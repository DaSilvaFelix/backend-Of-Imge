const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: path.join(__dirname, "../../images"),
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

exports.upload = upload.single("image");

exports.uploadFile = (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    const tipo = req.file.mimetype;
    const nombre = req.file.originalname;
    conn.query(
      "INSERT INTO " + req.params.tabla + " set ?",
      [{ tipo, nombre }],
      (err, rows) => {
        console.log(
          err
            ? "Err INSERT INTO " + req.params.tabla + " " + err
            : req.params.tabla + " :Imagen agregada"
        );
        res.json({
            message: err
            ? "Error al agregar la imagen"
            : "Imagen agregada correctamente",
        })
      }
    );
  });
};
