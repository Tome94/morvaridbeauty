import { DrawerComponent } from "../components/Drawer";
import bgImage from "../assets/about.png";
const content = "";
const context = "About";
function About() {
  return (
    <DrawerComponent context={context} content={content} bgImage={bgImage} />
  );
}

export default About;
