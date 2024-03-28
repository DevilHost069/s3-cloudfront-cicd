import { useConfiguration } from "@contexts/ConfigurationContext";
import { hexToRgb } from "./helper";

export const useColors = () => {
  const { configurations } = useConfiguration();

  if (!configurations) return { primaryColor: "#5a5574", primaryLightColor: "#898aac" };

  const primaryColor = configurations?.data?.branding?.primary_color || "#5a5574";
  const primaryLightColor = configurations?.data?.branding?.primary_light_color || "#898aac";

  return { primaryColor, primaryLightColor };
};


export const getBackgroundImage = () => {
  const { configurations } = useConfiguration();
  const imageUrl = configurations?.data?.branding?.background_image || "/src/assets/img/hannahmed_signin_img.jpg";
  return imageUrl;
}


function setRgbProperties(styleElement, properties, rgbValue) {
  properties.forEach(property => {
    styleElement.style.setProperty(property, rgbValue);
  });
}

export const updateGlobalColors = () => {
  const { configurations } = useConfiguration();
  if (!configurations.data) return
  const primaryColor = configurations?.data?.branding?.primary_color || "#5a5574"; // Default value
  const primaryLightColor = configurations?.data?.branding?.primary_light_color || "#898aac"; // Default value

  // Access the root element for setting CSS variables
  const styleElement = document.querySelector(":root");

  setRgbProperties(
    styleElement,
    ["--bs-primary-900"],
    primaryColor
  );

  setRgbProperties(
    styleElement,
    ["--bs-primary-500", "--bs-primary-400"],
    primaryLightColor
  );

  // Convert hex to rgb values for primary and primary light colors
  let primaryColor_rgbColorObject = hexToRgb(primaryColor);
  let primaryLightColor_rgbColorObject = hexToRgb(primaryLightColor);

  // Set colors for Primary
  setRgbProperties(
    styleElement,
    ["--bs-primary-900-rgb"],
    `${primaryColor_rgbColorObject?.r},${primaryColor_rgbColorObject?.g}, ${primaryColor_rgbColorObject?.b}`
  );
  // Set colors for primary light
  setRgbProperties(
    styleElement,
    ["--bs-primary-400-rgb", "--bs-primary-500-rgb"],
    `${primaryLightColor_rgbColorObject?.r},${primaryLightColor_rgbColorObject?.g}, ${primaryLightColor_rgbColorObject?.b}`
  );

  // This function will not work as at the time of loading this function, the element does not exist.
  // document.querySelectorAll(`root.btn-outline-primary`).forEach(btn => {
  //   setRgbProperties(
  //     btn, 
  //     ["--bs-btn-hover-bg", "--bs-btn-active-bg"], 
  //     "red"
  //     // `rgb(${primaryLightColor_rgbColorObject?.r},${primaryLightColor_rgbColorObject?.g}, ${primaryLightColor_rgbColorObject?.b})`
  //   );
  // });
  
  // Add an event listener to a parent element that contains all buttons
  document.addEventListener('mouseover', function (event) {
    if (event.target instanceof HTMLElement) {
      // Check if the element has the .btn-outline-primary class
      if (event.target.classList.contains('btn-outline-primary')) {
        // Set the custom property for the hovered button
        setRgbProperties(
          event.target, 
          ["--bs-btn-hover-bg", "--bs-btn-active-bg"], 
          `rgb(${primaryLightColor_rgbColorObject?.r},${primaryLightColor_rgbColorObject?.g}, ${primaryLightColor_rgbColorObject?.b})`
        );
      }
    }
  
  });
}
