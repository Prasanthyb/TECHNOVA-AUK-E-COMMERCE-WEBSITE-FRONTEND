import HeroSection from "./components/HeroSection";


const About = () => {
  

  const data = {
    name: "Technova Ecommerce",
  };

  return (
    <>
    
      <HeroSection myData={data} />
    </>
  );
};

export default About;