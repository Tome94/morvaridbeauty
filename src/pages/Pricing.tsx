import { DrawerComponent } from "../components/Drawer";
import bgImage from "../assets/pricing2.png";
const content = "";
const context = "Pricing";
function Pricing() {
  return (
    <DrawerComponent context={context} content={content} bgImage={bgImage} />
  );
}

export default Pricing;
