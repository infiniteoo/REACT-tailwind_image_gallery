import "./assets/main.css";
import { useState, useEffect } from "react";
import ImageCard from "./components/ImageCard";

function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [term, setTerm] = useState("");

  useEffect(() => {
    fetch(
      `https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${term}_type=photo&pretty=true`,
      { mode: "cors" }
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setImages(result.hits);
          setIsLoading(false);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  return (
    <div className="container mx-auto">
      {isLoading ? (
        <h1 className="text-6xl text-center mx-auto mt-32">Loading...</h1>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {images.map((image) => {
            return <ImageCard key={image.id} image={image} />;
          })}
        </div>
      )}
    </div>
  );
}

export default App;
