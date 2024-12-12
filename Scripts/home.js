/*
SPDX-License-Identifier: GPL-2.0-only
Copyright © 2024 mozahzah. All rights reserved.
Author: mozahzah 
*/

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth < 991;
const homeBackgroundVideo = document.getElementById("home-background-video");

document.addEventListener('DOMContentLoaded', function () 
{
    if (isMobile)
    {
        setupMobile()
    }
    else
    {
        setupDesktop()
    }

    window.addEventListener('resize', onWindowResize);
    window.addEventListener('scroll', onWindowScroll);
    
    const iframe = document.getElementById('home-background-video');
    const player = new Vimeo.Player(iframe);
    player.on('play', function () 
    {
        const loader = document.getElementById('loader-container');
        loader.classList.add('hidden');
    }); 

    updateActiveNavLink();
});


/* Setup */


function setupDesktop()
{ 
    document.addEventListener("mousemove", onMouseMove, false);

    document.querySelectorAll('a[href^="#"]').forEach(anchor => 
    {
        anchor.addEventListener('click', function (e) 
        {
            e.preventDefault();
      
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
      
            const targetPosition = targetElement.offsetTop - 90;
      
            window.scrollTo(
            {
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
}

function setupMobile()
{
    if ('DeviceOrientationEvent' in window && isMobile) 
    {
        window.addEventListener("deviceorientation", (event) => 
        {
            handleOrientationEvent(event.beta, event.gamma, event.alpha);
        }, true);
    }
}


/* Events */


function onWindowResize() 
{
    if (window.location)
    {
        window.location.reload();
    }
}

function onWindowScroll() 
{
    updateActiveNavLink();
}

function onMouseMove(mouseEvent)
{
    if (homeBackgroundVideo)
    {
        homeBackgroundVideo.style.left = 50 - mouseEvent.clientX / 500 + "%";
        homeBackgroundVideo.style.top = 50 - mouseEvent.clientY / 500 + "%";
    }
}


/* Helpers */


function updateActiveNavLink() 
{
    const scrollPosition = window.scrollY;
    const navLinks = document.querySelectorAll('a[href^="#"]');

    let bIsOneNavActive = false;
    navLinks.forEach(link => 
    {
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) 
        {
            const sectionTop = targetElement.offsetTop;

            if (scrollPosition <= sectionTop && !bIsOneNavActive) 
            {
                link.classList.add('active');
                bIsOneNavActive = true;
            }
            else
            {
                link.classList.remove('active');
            }
        }
    });
}

const handleOrientationEvent = (frontToBack, leftToRight, rotateDegrees) => 
{
    if (homeBackgroundVideo && frontToBack && leftToRight && rotateDegrees)
    {
        homeBackgroundVideo.left += -leftToRight + "%";
        homeBackgroundVideo.top += -frontToBack + "%";
    }
};


/* Content loading */


function loadProjectsJsonFile() 
{
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '../CMS/projects-cms.json', false);
    xhr.send();

    if (xhr.status === 200)
    {
        const data = JSON.parse(xhr.responseText);
        const portfolioBody = document.getElementById('projects-section');
        
        let i = 0;
        data.forEach(projectItem => 
        {
            portfolioBody.innerHTML += `
            <div onclick="window.open('${projectItem.link}', '_blank')" class="project-container">
                <div class="project-image-wrapper">
                    <img src="../CMS/${projectItem.image}" class="project-image"></img>
                </div>
                <div class="project-text-section">
                    <h3 class="project-title">${projectItem.title}</h3>
                    <p class="project-description">${projectItem.description}</p>
                </div>
            </div>
            `;
        });

        const projectContainers = document.getElementsByClassName("project-container");
        if (projectContainers) 
        {
            for (let i = 0; i < projectContainers.length; i++) 
            {
                const projectItem = projectContainers.item(i);
                const imageWrapper = projectItem.querySelector(".project-image-wrapper");
                const textSection = projectItem.querySelector(".project-text-section");
                if (i % 2 !== 0) 
                {
                    projectItem.style.flexDirection = "row-reverse";
                    imageWrapper.classList.add("add-right-border-radius");
                    textSection.classList.add("add-left-border-radius");
                }
                else
                {
                    projectItem.style.flexDirection = "row";
                    imageWrapper.classList.add("add-left-border-radius");
                    textSection.classList.add("add-right-border-radius");
                }
            }
        }
    }
}
loadProjectsJsonFile();