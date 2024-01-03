import images from "./ImageLoader";
interface ContentItem {
  id: string;
  title: string;
  image?: string; // Optional, since a link might not have an image
  __typename: string;
  url?: string; // Optional URL for links
}

// Updated factory function for creating movie objects
const createContentItem = (id: string, title: string, image: any, url?: string): ContentItem => {
  if (url) {
    return {
      id,
      title,
      image,
      __typename: "Link",
      url,
    };
  } else {
    return {
      id,
      title,
      image,
      __typename: "Movie",
    };
  }
};

// Generate your mock JSON using the factory function
const movies: ContentItem[] = [
  createContentItem("1", "highlights", images[0]), // Assuming images is your array of loaded images
  createContentItem("2", "brown", images[1]),
  createContentItem("3", "blonde", images[2]),
  createContentItem("4", "red", images[3]),
  createContentItem("5", "brown", images[4]),
  createContentItem("6", "brown", images[5]),
  createContentItem("7", "brown", images[6]),
  createContentItem("8", "brown", images[7]),
  createContentItem("9", "brown", images[8]),
  createContentItem("10", "Instagram", images[10], "https://instagram.com/yourusername"),

  // Add more movies as needed
];

export default movies;
