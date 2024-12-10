document.addEventListener("DOMContentLoaded", () => {
  const menuItems = document.querySelectorAll(".list-group-item");
  const submenus = document.querySelectorAll(".submenu");
  const showMoreButtons = document.querySelectorAll(".show-more"); // Все кнопки "Показать больше"
  let activeSubmenu = null;
  let hoverTimeout = null;
  let hideTimeout = null;
  let isHovering = false;

  function showMore(button) {
    const targetListId = button.getAttribute("data-target"); // ID целевого списка
    const targetList = document.getElementById(targetListId); // Находим список по ID

    if (targetList) {
      const hiddenItems = targetList.querySelectorAll(".hidden"); // Только скрытые элементы
      hiddenItems.forEach((item) => {
        item.classList.remove("hidden");
      });

      button.style.display = "none";
    } else {
      console.error(`Список с ID "${targetListId}" не найден`);
    }
  }

  function resetAllShowMore() {
    showMoreButtons.forEach((button) => {
      const targetListId = button.getAttribute("data-target"); // ID целевого списка
      const targetList = document.getElementById(targetListId); // Находим список по ID

      if (targetList) {
        const allItems = targetList.querySelectorAll("li"); // Все элементы списка
        allItems.forEach((item) => {
          if (item.dataset.hidden === "true") {
            item.classList.add("hidden");
          }
        });
        button.style.display = "";
      }
    });
  }

  showMoreButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetListId = button.getAttribute("data-target");
      const targetList = document.getElementById(targetListId);
      if (targetList) {
        const hiddenItems = targetList.querySelectorAll(".hidden");
        hiddenItems.forEach((item) => {
          item.classList.remove("hidden");
          item.dataset.hidden = "true";
        });
        button.style.display = "none";
      }
    });
  });

  menuItems.forEach((item) => {
    item.addEventListener("mouseover", () => {
      clearTimeout(hoverTimeout);

      isHovering = true;

      hoverTimeout = setTimeout(() => {
        if (isHovering) {
          if (activeSubmenu) {
            activeSubmenu.style.display = "none";
          }

          const submenuId = item.getAttribute("data-menu");
          const submenu = document.getElementById(submenuId);
          if (submenu) {
            submenu.style.display = "block";
            activeSubmenu = submenu;
          }

          resetAllShowMore();
        }
      }, 300);
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

  document.querySelector(".col-3").addEventListener("mouseleave", () => {
    startHideTimeout();
  });

  function startHideTimeout() {
    hideTimeout = setTimeout(() => {
      if (activeSubmenu) {
        activeSubmenu.style.display = "none";
        activeSubmenu = null;
      }

      resetAllShowMore();
    }, 300);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const menuItem = document.getElementById("softFurnitureMenu");
  const submenu = document.getElementById("softFurnitureSubmenu");
  const mainMenu = document.getElementById("mainMenu");

  menuItem.addEventListener("click", function () {
    submenu.classList.toggle("open");
    mainMenu.style.display = "none";
  });

  const showMoreBtn = document.getElementById("show-more-4");
  const hiddenItems = document.querySelectorAll(".hidden");

  showMoreBtn.addEventListener("click", function () {
    hiddenItems.forEach((item) => {
      item.style.display = "block";
    });
    showMoreBtn.style.display = "none";
  });
});
