
window.onload = function(){
    // let webScroll = new WebScroll();

    const header = document.querySelector("#header");
    const visual_tit_con1 = document.querySelector(".visual_tit_con1");
    const visual_tit_con2 = document.querySelector(".visual_tit_con2");

    const visual = document.querySelector("#visual");
    const about = document.querySelector("#about");

    const about_inner_txt = document.querySelectorAll(".about_inner_txt");
    const about_txt = document.querySelector(".about_txt");
    

    for(let el of about_inner_txt){
        let about_inner_txt_val = el.innerHTML.split("");
        
        el.innerHTML = "";

        about_inner_txt_val.forEach((data, index)=>{
            let about_inner_span = document.createElement("span");
            about_inner_span.classList.add("about_inner_span");
            about_inner_span.style.transition = `${0.1 * index}s`;
            el.append(about_inner_span);
            about_inner_span.append(about_inner_txt_val[index]);
        });
    };

    const about_span = document.querySelectorAll(".about_inner_span");
    for(let el of about_span){
        if(el.innerText == ""){
            el.style.marginRight = "5px";
        }
    }

    const brand = document.querySelector("#brand");
    const brand_cover = document.querySelector(".brand_cover");
    const brand_left_box = document.querySelector(".brand_left_box");
    const brand_right_inner = document.querySelectorAll(".brand_right_inner");
    const brand_cover_con = document.querySelectorAll(".brand_cover_con");

    
    const gallery = document.querySelector("#gallery");
    const gallery_horizon = document.querySelector(".gallery_horizon");
    const gallery_horizon_con = document.querySelectorAll(".gallery_horizon_con");
    const gallery_horizon_wid = gallery_horizon.clientWidth;

    const banner = document.querySelector("#work");

    const world_map = document.querySelector("#world_map");
    const world_map_img = document.querySelector(".world_map_img");
    const world_map_inner_img = document.querySelector(".world_map_inner_img");

    const story = document.querySelector("#story");
    const story_con_wrap = document.querySelector(".story_con_wrap");
    const story_inner_con = document.querySelectorAll(".story_inner_con");

    let pathY = 200;
    let visualPer;
    let brandPer;
    let worldMapPer;
    let storyPer;

    let brandNum = 0;
    let brandArr = [];
    
 
    init();

    window.addEventListener("scroll", (e)=>{
        let posY = document.querySelector("html, body").scrollTop;
        let aboutY = about.offsetTop;
        let brandY = brand.offsetTop;
        let galleryY = gallery.offsetTop;
        let bannerY = banner.offsetTop;
        let world_mapY = world_map.offsetTop;
        let storyY = story.offsetTop;

        let visual_ht = visual.clientHeight;
        let brand_left_box_ht = brand_left_box.clientHeight;

        let brandPosY = posY - brandY;
        let galleryPosY = posY - galleryY;
        let worldMapPosY = posY - world_mapY;
        let storyPosY = posY - storyY;

        visualPer = parseInt(((posY / visual_tit_con2.clientHeight) * 100) * 2);
        worldMapPer = parseInt((worldMapPosY / world_map_img.clientHeight) * 100);
        storyPer = parseInt((storyPosY / story_con_wrap.clientHeight) * 100);



        if(posY >= 0 && posY < aboutY){
            // if(posY > visual_ht / 6){
            //     header.classList.add("active");
            // } else {
            //     header.classList.remove("active");
            // };
            visual_tit_con2.style.clipPath = `circle(${20 + visualPer * 2}% at 100% 100%)`;
        };

        if(posY >= aboutY - 200){
            about_txt.classList.add("on");
        } else {
            about_txt.classList.remove("on");
        };

        if(posY >= brandY - 400){
            brand_cover.classList.add("active");
        } else {
            brand_cover.classList.remove("active");
        }

        if(posY >= brandY){

            brandArr = [];

            for(let i=0; i<brand_right_inner.length; i++){
                let brand_right_innerY = brand_right_inner[i].offsetTop;
                brandArr.push(brand_right_innerY);
                
                if(brandPosY >= brandArr[i] - 300){
                    brand_cover_con[i].classList.add("on");
                } else {
                    brand_cover_con[i].classList.remove("on");
                };
            };

            if(brandPosY <= 500){
                brand_cover.style.transform = `translateX(${-brandPosY / 5}%)`;
            } else {
                brand_cover.style.transform = `translateX(-100%)`;
            }
        } else {
            brand_cover.style.transform = `translateX(0%)`;
        };

        if(posY >= galleryY && posY < galleryY + gallery_horizon_wid / 2){
            gallery.addEventListener("mousewheel", (e)=>{
                let wheel = e.deltaY;
                for(let el of gallery_horizon_con){
                    if(wheel > 0){
                        el.classList.add("down");
                        el.classList.remove("up");
                        setTimeout(()=>{
                            el.classList.remove("down");
                        }, 30);
                    } else {
                        el.classList.remove("down");
                        el.classList.add("up");
                        setTimeout(()=>{
                            el.classList.remove("up");
                        }, 30);
                    }
                }
            })

            if(galleryPosY >= 0){
                gallery_horizon.style.transform = `translateX(${-galleryPosY}px)`;
            } else {
                gallery_horizon.style.transform = `translateX(0px)`;
            }
        };

        if(posY >= world_mapY && worldMapPer <= 200){
            world_map_inner_img.style.transform = `scale(${1 + worldMapPer / 100}) translate(${-worldMapPer / 6}%, ${worldMapPer / 10}%)`
        }
        if(worldMapPer > 200 && posY < storyY){
            document.querySelector('.world_map_point').style.transform = `scale(${(worldMapPer - 202)})`;

            if(worldMapPer >= 350){
                document.querySelector(".world_map_point_inner_txt").style.opacity = `${(worldMapPer - 350) / 50}`;
            } else {
                document.querySelector(".world_map_point_inner_txt").style.opacity = 0;
            }
        }else {
            document.querySelector('.world_map_point').style.transform = `scale(0)`;
        };

        if(posY >= storyY){
            if(storyPer > 0 && storyPer <= 100){
                if(storyPer <= 20){
                    story_inner_con[0].style.transform = `scale(${1 - storyPer / 100})`;
                }
                story_inner_con[1].style.transform = `translateY(${-storyPer}%)`;  
                story_inner_con[2].style.transform = `translateY(${-storyPer}%)`;  
            } ;

            if(storyPer > 100 && storyPer <= 200){
                if(storyPer <= 120){
                    story_inner_con[1].style.transform = `translateY(-100%) scale(${2 - storyPer / 100})`; 
                }
                story_inner_con[2].style.transform = `translateY(${-storyPer}%)`;  
            };
        };
    });

    window.addEventListener("mousewheel", (e)=>{
        let wheel = e.deltaY;

        if(wheel < 0){
            header.classList.remove("active");
        } else {
            header.classList.add("active");
        }
    });

    
    for(let el of gallery_horizon_con){
        el.addEventListener("mouseenter", (e)=>{
            const cursor = document.createElement("div");
            cursor.classList.add("link_cursor");
            document.querySelector("body").append(cursor);

            document.querySelector(".gallery_bg").classList.add("active");
            el.classList.add("on");
            gallery_horizon_con.forEach((data)=>{
                if(!data.classList.contains("on")){
                    data.classList.add("off");
                };
            });
        });

        el.addEventListener("mousemove", (e)=>{
            let posY = e.clientY;
            let posX = e.pageX;

            document.querySelector(".link_cursor").style.top = `${posY + 20}px`;
            document.querySelector(".link_cursor").style.left = `${posX + 20}px`;
        })

        el.addEventListener("mouseleave", ()=>{
            document.querySelector(".gallery_bg").classList.remove("active");gallery_horizon_con.forEach((data)=>{
                data.classList.remove("off");
                data.classList.remove("on");
            });
            document.querySelector(".link_cursor").remove();
        })
    };

    function init(){
        gallery.style.height = `${gallery_horizon_wid}px`;
    };

    
};





// function WebScroll(){
//     this.header = documentl.querySelector("#header");
//     this.visual_tit_con1 = document.querySelector(".visual_tit_con1");
//     this.visual_tit_con2 = document.querySelector(".visual_tit_con2");

//     this.visual = document.querySelector("#visual");
//     this.info = document.querySelector("#info");
    
//     this.brand = document.querySelector("#brand");
//     this.brand_cover = document.querySelector(".brand_cover");
//     this.brand_left_box = document.querySelector(".brand_left_box");
//     this.brand_right_box = document.querySelector(".brand_right_box");
//     this.brand_right
// };