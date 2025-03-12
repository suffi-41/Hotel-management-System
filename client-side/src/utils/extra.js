import images_1 from "../assets/index_1.jpg";
import images_2 from "../assets/about.jpg";
import images_3 from "../assets/milestones.jpg";
import images_4 from "../assets/pexels-quark-studio-1159039-2506988.jpg";
import images_5 from "../assets/pexels-fotoaibe-1743231.jpg";
import images_6 from "../assets/pexels-pixabay-258154.jpg";
import images_7 from "../assets/pexels-pixabay-262047.jpg";
import images_8 from "../assets/pexels-quark-studio-1159039-2507010.jpg";
import images_9 from "../assets/pexels-quark-studio-1159039-2507010.jpg";
import images_10 from "../assets/pexels-wildlittlethingsphoto-2017802.jpg";

export const backgroundImage = () => {
  const images = [
    images_1,
    images_2,
    images_3,
    images_4,
    images_5,
    images_6,
    images_7,
    images_8,
    images_9,
    images_10
  ]
  return images[random(0, images.length - 1)]
}

export const logged_token = () => {
  return localStorage.getItem("authentication_token")
}

export const middle_hidden = (string) => {
  const first = string.slice(0, 3);
  const last = string.slice(-10);
  const hidden = string.replace(/./g, "*").slice(0, 10);
  return `${first}${hidden}${last}`
}




