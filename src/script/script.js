window.onload = function(){
    var diary = {
        activeSubject: null,
        overSubject: null,
        currentDiary: null,
        init: function(){
            let subjects = document.querySelectorAll(".js-diary .js-subject");

            subjects.forEach(function(item, index){
                item.addEventListener("mousedown", diary.mouseDown);
                item.addEventListener("mouseover", diary.mouseOver);
                item.addEventListener("mouseout", diary.mouseOut);
                item.parentElement.addEventListener("mouseup", diary.mouseUpParent);
            });

            window.addEventListener("mouseup", diary.mouseUp);
            window.addEventListener("mousemove", diary.mouseMove);
        },
        mouseDown: function(e){
            diary.activeSubject = this;
            diary.currentDiary = this.closest(".js-diary");

            let width = diary.activeSubject.offsetWidth;

            diary.activeSubject.style.position =       "absolute";
            diary.activeSubject.style.width =           width + "px";
            diary.activeSubject.style.pointerEvents =  "none";
            diary.activeSubject.style.zIndex =          999;
        },
        mouseUp: function(e){
            if(diary.activeSubject != null){
                if(diary.overSubject != null && e.target.closest(".js-diary") == diary.currentDiary){
                    let clone = diary.activeSubject.parentElement.removeChild(diary.activeSubject);
                    diary.insertAfter(clone, diary.overSubject);
                }

                diary.activeSubject.style.position =        "static";
                diary.activeSubject.style.width =           "auto";
                diary.activeSubject.style.zIndex =          "auto";
                diary.activeSubject.style.pointerEvents =   "auto";
                diary.activeSubject.style.top =             "auto";
                diary.activeSubject =                        null;

                diary.currentDiary = null;
            }
        },
        mouseUpParent: function(e){
            if(diary.activeSubject != null && this.children.length === 0  && this.closest(".js-diary") == diary.currentDiary){
                
                let clone = diary.activeSubject.parentElement.removeChild(diary.activeSubject);
                this.appendChild(clone);
            }
        },
        mouseMove: function(e){
            if(diary.activeSubject != null){
                diary.activeSubject.style.top = e.pageY - diary.activeSubject.offsetHeight / 2 + 'px';
            }
        },
        mouseOver: function(e){
            diary.overSubject = this;
            if(diary.activeSubject != null && this != diary.activeSubject){
                this.classList.add("row--highlited");
            }
        },
        mouseOut: function(e){
            diary.overSubject = null;
            this.classList.remove("row--highlited");
        },
        insertAfter: function(newNode, referenceNode) {
            referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
        }
    }


    var accordeon = {
        init: function(){
            let accordeons = document.querySelectorAll(".js-accordeon");

            accordeons.forEach(function(item){
                item.addEventListener("click", accordeon.click);
            });
        },
        click: function(e){
            this.classList.toggle("js-accordeon-opened");
        }
    }
    
    accordeon.init();
    diary.init();
}