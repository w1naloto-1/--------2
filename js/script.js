document.addEventListener("DOMContentLoaded", () => {
    const menuItems = document.querySelectorAll(".list-group-item");
    const submenus = document.querySelectorAll(".submenu");
    const showMoreButtons = document.querySelectorAll(".show-more");
    const mainMenu = document.getElementById("mainMenu");
    let activeSubmenu = null;
    let hoverTimeout = null;
    let hideTimeout = null;
    let isHovering = false;
  
    function showMore(button) {
      const targetListId = button.getAttribute("data-target");
      const targetList = document.getElementById(targetListId);
  
      if (targetList) {
        const hiddenItems = targetList.querySelectorAll(".hidden");
        hiddenItems.forEach((item) => {
          item.classList.add("visible");
        });
  
        button.style.display = "none";
      } else {
        console.error(`Список с ID "${targetListId}" не найден`);
      }
    }
  
    function hideVisibleItems() {
      const visibleItems = document.querySelectorAll(".visible");
      visibleItems.forEach((item) => {
        item.classList.remove("visible");
      });
  
      showMoreButtons.forEach((button) => {
        button.style.display = "";
      });
    }
  
    showMoreButtons.forEach((button) => {
      button.addEventListener("click", () => showMore(button));
    });
  
    menuItems.forEach((item) => {
      item.addEventListener("mouseover", () => {
        if (window.innerWidth >= 768) {
          clearTimeout(hoverTimeout);
  
          isHovering = true;
  
          hoverTimeout = setTimeout(() => {
            if (isHovering) {
              if (activeSubmenu) {
                activeSubmenu.style.display = "none";
                hideVisibleItems();
              }
  
              const submenuId = item.getAttribute("data-menu");
              const submenu = document.getElementById(submenuId);
              if (submenu) {
                submenu.style.display = "block";
                activeSubmenu = submenu;
              }
            }
          }, 300);
        }
      });
  
      item.addEventListener("mouseleave", () => {
        isHovering = false;
      });
    });
  
    submenus.forEach((submenu) => {
      submenu.addEventListener("mouseover", () => {
        clearTimeout(hideTimeout);
      });
  
      submenu.addEventListener("mouseleave", () => {
        startHideTimeout();
      });
    });
  
    document.querySelector(".col-lg-3").addEventListener("mouseleave", () => {
      startHideTimeout();
    });
  
    function startHideTimeout() {
      hideTimeout = setTimeout(() => {
        if (activeSubmenu) {
          activeSubmenu.style.display = "none";
          hideVisibleItems();
          activeSubmenu = null;
        }
      }, 300);
    }
  
    window.addEventListener("resize", () => {
      if (window.innerWidth < 768 && activeSubmenu) {
        activeSubmenu.style.display = "none";
        hideVisibleItems();
        activeSubmenu = null;
      }
    });
  
    const container = document.querySelector(".menu-mobile-main-сatalog");
    const hiddenList = document.querySelectorAll(".sub-menu-container.hidden");
    const containerS = document.querySelector(".menu-mobile-main"); // Исправлено имя класса
    const hiddenLists = document.querySelectorAll(".menu-mobile-main");
  


    const buttonBack1 = document.getElementById("backButtonMobile2");
    const buttonBack2 = document.getElementById("backButtonMobile1");
    if (!container || !containerS || !buttonBack1) {
      console.error("Не найдены элементы container, containerS или buttonBack!");
      return;
    }

    


    containerS.addEventListener("click", (event) => {
      const li = event.target.closest("li");
    if (li && !li.closest(".main-menu") && li.dataset.id){
        const id = li.dataset.id;
    
        hiddenList.forEach((ul) => {
          if (ul.dataset.id === id) {
            ul.classList.remove("hidden");
          } else {
            ul.classList.add("hidden");
          }
        });
    
        containerS.style.transform = "translateX(-100%)";
      }
    });
    
    
    container.addEventListener("click", (event) => {
      const li = event.target.closest("li");
      if (li && li.dataset.id) {
        const id = li.dataset.id;
    
        hiddenLists.forEach((ul) => {
          if (ul.dataset.id === id) {
            ul.classList.remove("hidden");
          } else {
            ul.classList.add("hidden");
          }
        });
    
        container.style.transform = "translateX(-100%)";
      }
    });
    
    containerS.addEventListener("click", (event) => {
      const li = event.target.closest("li");
      if (li && li.dataset.id) {
        const id = li.dataset.id;
    
        hiddenList.forEach((ul) => {
          if (ul.dataset.id === id) {
            ul.classList.remove("hidden");
          } else {
            ul.classList.add("hidden");
          }
        });
    
        containerS.style.transform = "translateX(-100%)";
      }
    });
    
    buttonBack2.addEventListener("click", () => {
      containerS.style.transform = "translateX(-100%)"; // Возвращаем в исходное положение
    
      setTimeout(() => {
        hiddenLists.forEach((ul) => {
          ul.classList.add("hidden");
        });
      }, 300);
    });
    
    buttonBack1.addEventListener("click", () => {
      container.style.transform = "translateX(-100%)"; // Возвращаем в исходное положение
    
      setTimeout(() => {
        hiddenLists.forEach((ul) => {
          ul.classList.add("hidden");
        });
      }, 300);
    });
    
  
    const showMoreButton = document.getElementById("showMoreButton-mobile");
    const hiddenItems = document.querySelectorAll(".menu-item-mobile.hidden");
  
    showMoreButton.addEventListener("click", () => {
      hiddenItems.forEach((item) => {
        item.classList.remove("hidden");
      });
  
      showMoreButton.style.display = "none";
    });


    
  });
  