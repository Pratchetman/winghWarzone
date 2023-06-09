import React, { useState } from "react";
import "./uploadSetup.scss";
import { Button } from "react-bootstrap";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "../../utils/fireBaseConf";
import { getDatabase, ref as ref2, set, get, child } from "firebase/database";

const storage = getStorage();

const memeDefault = {
  id: "",
  text: "",
  img: "",
};

export const UploadMeme = ({ meme, setMeme }) => {
  const [newMeme, setNewMeme] = useState(memeDefault);
  const [file, setFile] = useState();
  const [error, setError] = useState("");
  const inputFile = React.useRef();

  const handleChange = (e) => {
    let { name, value } = e.target;
    setNewMeme({ ...newMeme, [name]: value });
  };

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = () => {
    if (file.name.includes("jpg") || file.name.includes("png")) {
      const fileName =
        file.name.split(".")[0] +
        "-" +
        Date.parse(new Date()) / 1000 +
        "." +
        file.name.split(".")[1];
      const storageRef = ref(storage, "memes/" + fileName);
      console.log(storageRef);
      uploadBytes(storageRef, file).then((snapshot) => {
        setError("");
        getDownloadURL(ref(storage, "memes/" + fileName)).then((url) => {
            console.log(url);
          let ident = Date.parse(new Date()) / 1000;
          let dbs = getDatabase();
          set(ref2(dbs, "memes/" + ident), {
            id: ident,
            text: newMeme.text,
            img: url.toString(),
          });
          setMeme([
            
            {
              id: ident,
              text: newMeme.text,
              img: url.toString(),
            }, ...meme
          ]);
          setNewMeme(memeDefault);
          inputFile.current.value = "";
          console.log(file);
        });
      });
    } else {
      setError("Archivo no compatible");
    }
  };

  return (
    <section>
      <h2>Añadir artículo</h2>
      <div className="inputsNewArticle">
        <input
          type="text"
          onChange={handleChange}
          value={newMeme.text}
          name="text"
          placeholder="Texto"
        />

        <input
          type="file" ref={inputFile}
          onChange={handleFile}
          placeholder="Seleccionar imagen"
          
        />
      </div>
      <Button onClick={handleSubmit}>Añadir</Button>
      <p className="error">{error}</p>
    </section>
  );
};
