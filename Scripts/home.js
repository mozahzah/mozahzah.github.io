/*
SPDX-License-Identifier: GPL-2.0-only
Copyright © 2024 mozahzah. All rights reserved.
Author: mozahzah 
*/

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
const mobileButton = document.getElementById("landing-page-button");
const helloContainer= document.getElementById("hello-container");
const portfolioButton= document.getElementById("portfolio-button");
const wallpaper = document.getElementById("home-background-video");

console.log($(document.getElementsByClassName("hover-text")));

$(function()
{
    console.log("HEEE");
    if (window.innerWidth < 991 || isMobile)
    {
        if (mobileButton)
        {
            mobileButton.style.zIndex = "1";
            mobileButton.addEventListener("click", mobileLandingPage, false);
        }
    }

    document.addEventListener("mousemove", move, false);
});

document.addEventListener('DOMContentLoaded', function () 
{
    if (portfolioButton) 
    {
        portfolioButton.addEventListener("click", switchToPortfolio, false);
        SetupMobileButton();
        SetupMobile();

        window.addEventListener('resize', function () 
        {
            window.location.reload();
            SetupMobileButton();
            SetupMobile();
        });
    }
});

function move(mouseEvent)
{
    if (wallpaper)
    {
        wallpaper.style.left = mouseEvent.clientX / 800 + "%";
        wallpaper.style.top = mouseEvent.clientY / 800 + "%";
    }
}

function switchToPortfolio()
{
    if (helloContainer && mobileButton)
    {
        helloContainer.style.zIndex = "-1";
        mobileButton.removeEventListener("click", mobileLandingPage, false);
        mobileButton.addEventListener("click", function () { location.reload(); }, false);
    }
}

function SetupMobile()
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
    if (wallpaper && frontToBack && leftToRight && rotateDegrees)
    {
        wallpaper.left += -leftToRight + "%";
        wallpaper.top += -frontToBack + "%";
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