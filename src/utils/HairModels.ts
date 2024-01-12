import images from "./ImageLoader";
import instagram from "../assets/HairPromo/instagram.jpg"
import blueBalayage from "../assets/HairPromo/Hair1.png"

interface ContentItem {
  id: string;
  title: string;
  image?: string; // Optional, since a link might not have an image
  __typename: string;
  url?: string; // Optional URL for links
}

// Updated factory function for creating hair objects
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
      __typename: "Hair",
    };
  }
};

// Generate your mock JSON using the factory function
const hairs: ContentItem[] = [
  createContentItem("1", "Blue Balayage", blueBalayage), // Assuming images is your array of loaded images
  createContentItem("2", "Full Color, Cut & Styling", images[1]),
  createContentItem("3", "Silver Balayage, Cut & Styling", images[2]),
  createContentItem("4", "Highlights with Styling", images[3]),
  createContentItem("5", "Styling", images[4]),
  createContentItem("6", "Ketin Treatment", images[5]),
  createContentItem("7", "HighLights with Styling", images[6]),
  createContentItem("8", "Full Bleach Color", images[7]),
  createContentItem("9", "Half Updo with Extensions", images[8]),
  createContentItem("10", "Instagram", instagram, "https://www.instagram.com/morvarid.hairstudio?igsh=empmbTMzemhrNjQ=")

];

export default hairs;
