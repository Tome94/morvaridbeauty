import images from "./ImageLoader";
interface Movie {
  id: string;
  title: string;
  image: string;
  __typename: string;
}

// Factory function for creating movie objects
const createMovie = (id: string, title: string, image: any): Movie => {
  // Assuming imageLoader is a function that takes an image path and returns the loaded image

  return {
    id,
    title,
    image,
    __typename: "Movie",
  };
};

// Generate your mock JSON using the factory function
const movies: Movie[] = [
  createMovie("1", "highlights", images[0]), // Assuming images is your array of loaded images
  createMovie("2", "brown", images[1]),
  createMovie("3", "blonde", images[2]),
  createMovie("4", "red", images[3]),
  createMovie("5", "brown", images[4]),
  createMovie("6", "brown", images[5]),
  createMovie("7", "brown", images[6]),
  createMovie("8", "brown", images[7]),

  // Add more movies as needed
];

export default movies;
