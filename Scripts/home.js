/*
SPDX-License-Identifier: GPL-2.0-only
Copyright © 2024 mozahzah. All rights reserved.
Author: mozahzah 
*/

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth < 991;
const mobileButton = document.getElementById("landing-page-button");
const helloContainer= document.getElementById("hello-container");
const portfolioButton= document.getElementById("portfolio-button");
const backgroundVideos = document.getElementsByClassName("background-video");

document.addEventListener('DOMContentLoaded', function () 
{
    // if (portfolioButton) 
    // {
    //     portfolioButton.addEventListener("click", switchToPortfolio, false);
        
    // }

    if (isMobile)
    {
        setupMobile()
    }
    else
    {
        setupDesktop()
    }

    window.addEventListener('resize', onWindowResize);
    
});

function onWindowResize() 
{
    if (window.location)
    {
        window.location.reload();
    }
}

function setupDesktop()
{ 
    document.addEventListener("mousemove", onMouseMove, false);
}

function onMouseMove(mouseEvent)
{
    if (backgroundVideos)
    {
        for (var backgroundVideo of backgroundVideos)
        {
            if (backgroundVideo instanceof HTMLElement)
            {
                backgroundVideo.style.left = 50 - mouseEvent.clientX / 800 + "%";
                backgroundVideo.style.top = 50 - mouseEvent.clientY / 800 + "%";
            }
        }
    }
}

function onPortfolioClicked()
{
    if (helloContainer && mobileButton)
    {
        helloContainer.style.zIndex = "-1";
        mobileButton.removeEventListener("click", mobileLandingPage, false);
        mobileButton.addEventListener("click", function () { location.reload(); }, false);
    }
}

function setupMobile()
{
    if (mobileButton)
    {
        if (window.innerWidth < 991 || isMobile)
        {
            if (mobileButton)
            {
                mobileButton.style.zIndex = "1";
                mobileButton.addEventListener("click", mobileLandingPage, false);
                //document.getElementById("touch-anywhere").style.display = "block";
            }
        }
        else 
        {
            mobileButton.style.zIndex = "-1";
            mobileButton.removeEventListener("click", mobileLandingPage, false);
        }
    }

    if ('DeviceOrientationEvent' in window && isMobile) 
    {
        window.addEventListener("deviceorientation", (event) => 
        {
            handleOrientationEvent(event.beta, event.gamma, event.alpha);
        }, true);
    }
}

const handleOrientationEvent = (frontToBack, leftToRight, rotateDegrees) => 
{
    if (backgroundVideos && frontToBack && leftToRight && rotateDegrees)
    {
        backgroundVideos.left += -leftToRight + "%";
        backgroundVideos.top += -frontToBack + "%";
    }
};

const hide = {opacity:0, left:0,}
const show = {opacity:100, left:0,}
var b = false;

function mobileLandingPage()
{
    if (mobileButton)
    {
        if (b === false)
        {
            console.log("clicked");
            $(document.getElementsByClassName("introText")).css(hide);
            $(document.getElementsByClassName("hoverText")).css(show);
            mobileButton.style.zIndex = "-1";
            b = true;
        }
        else 
        {
            $(document.getElementsByClassName("introText")).css(show);
            $(document.getElementsByClassName("hoverText")).css(hide);
            mobileButton.style.zIndex = "1";
            b = false;
        }
    }
}