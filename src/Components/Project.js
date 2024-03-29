
import React, { useState, useEffect } from 'react';
import ProjectCard from "../Components/Card"
import ImageProject1 from "../assets/Images Projets/1toa-heftiba-DQKerTsQwi0-unsplash1.webp";
import ImageProject2 from "../assets/Images Projets/2sophie-bluel1689172633206.webp";
import ImageProject3 from "../assets/Images Projets/3AboutBanner.webp";
import ImageProject4 from "../assets/Images Projets/4nina.webp";
import ImageProject5 from "../assets/Images Projets/5product-school-dJICd7b_LlE-unsplash.webp";
import ImageProject6 from "../assets/Images Projets/bank-tree.webp";
import ImageProject7 from "../assets/Images Projets/portfolioImg.webp";


function Project(){
  
  const [reposWithImages, setReposWithImages] = useState([]);

  useEffect(() => {
    const token = process.env.REACT_APP_GITHUB_TOKEN;
    const query = `
    query {
      viewer {
        repositories(first: 100, ownerAffiliations: OWNER, privacy: PUBLIC) {
          nodes {
            id
            name
            url
            description 
          }
        }
      }
    }
  `;

    fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ query }),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      console.log(data.errors)
      const repositories = data.data.viewer.repositories.nodes;
      

      const reposMappedWithImages = repositories.map((repo, index) => ({
        id: repo.id,
        name: repo.name,
        url: repo.url,
        description: repo.description,
        image: getCorrespondingImage(index),
        subtitle: getCorrespondingSubtitle(index) // Obtient l'image correspondante
      }));
  
      setReposWithImages(reposMappedWithImages);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
  }, []);


  const getCorrespondingImage = (index) => {
    switch (index) {
      case 0:
        return ImageProject1;
      case 1:
        return ImageProject2;
      case 2:
        return ImageProject3;
      case 3:
        return ImageProject4;
      case 4:
        return ImageProject5;
      case 5:
        return ImageProject6;
      case 6:
        return ImageProject7;
      default:
        return null;
    }
  };

  const getCorrespondingSubtitle = (index) => {
    switch (index) {
      case 0:
        return "html, sass, css";
      case 1:
        return "html, css, javascript";
      case 2:
        return "react, sass";
      case 3:
        return "html, css, seo";
      case 4: 
        return "html, javascript";
      case 5:
        return "css, react, redux";
      case 6:
        return "react, javascript, scss";

      default:
        return null;
    }
  };
  

    return(
      <section id='project'>
      <h2>Mes projets</h2>
      <div className="card-container">
        {reposWithImages.map((repo) => (
          <ProjectCard key={repo.id} repo={repo} altText={`Description de l'image ${repo.id}`}/>
        ))}
      </div>
    </section>
  );
}

export default Project