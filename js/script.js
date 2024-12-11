document.addEventListener("DOMContentLoaded", () => {
  const menuItems = document.querySelectorAll(".list-group-item");
  const submenus = document.querySelectorAll(".submenu");
  const showMoreButtons = document.querySelectorAll(".show-more");
  const mainMenu = document.getElementById("mainMenu");
  let activeSubmenu = null;
  let hoverTimeout = null;
  let hideTimeout = null;
  let isHovering = false;

  // Показать скрытые элементы списка
  function showMore(button) {
    const targetListId = button.getAttribute("data-target");
    const targetList = document.getElementById(targetListId);

    if (targetList) {
      const hiddenItems = targetList.querySelectorAll(".hidden");
      hiddenItems.forEach((item) => {
        item.classList.add("visible"); // Добавляем класс видимости
      });

      button.style.display = "none"; // Скрываем кнопку после клика
    } else {
      console.error(`Список с ID "${targetListId}" не найден`);
    }
  }

  // Скрыть элементы, которые были временно показаны
  function hideVisibleItems() {
    const visibleItems = document.querySelectorAll(".visible");
    visibleItems.forEach((item) => {
      item.classList.remove("visible"); // Убираем класс видимости
    });

    showMoreButtons.forEach((button) => {
      button.style.display = ""; // Показываем кнопку "Показать больше" снова
    });
  }

  // Обработка кнопок "Показать больше"
  showMoreButtons.forEach((button) => {
    button.addEventListener("click", () => showMore(button));
  });

  // Навешиваем обработчики на элементы меню
  menuItems.forEach((item) => {
    item.addEventListener("mouseover", () => {
      if (window.innerWidth >= 768) {
        clearTimeout(hoverTimeout);

        isHovering = true;

        hoverTimeout = setTimeout(() => {
          if (isHovering) {
            if (activeSubmenu) {
              activeSubmenu.style.display = "none"; // Скрываем предыдущее подменю
              hideVisibleItems(); // Скрываем временно показанные элементы
            }

            const submenuId = item.getAttribute("data-menu");
            const submenu = document.getElementById(submenuId);
            if (submenu) {
              submenu.style.display = "block"; // Показываем текущее подменю
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

  // Навешиваем обработчики на подменю
  submenus.forEach((submenu) => {
    submenu.addEventListener("mouseover", () => {
      clearTimeout(hideTimeout);
    });

    submenu.addEventListener("mouseleave", () => {
      startHideTimeout();
    });
  });

  // Обработчик для всей области меню
  document.querySelector(".col-lg-3").addEventListener("mouseleave", () => {
    startHideTimeout();
  });

  // Скрытие подменю с задержкой
  function startHideTimeout() {
    hideTimeout = setTimeout(() => {
      if (activeSubmenu) {
        activeSubmenu.style.display = "none"; // Скрываем активное подменю
        hideVisibleItems(); // Скрываем временно показанные элементы
        activeSubmenu = null;
      }
    }, 300);
  }

  // Обработчик для изменения размера окна
  window.addEventListener("resize", () => {
    if (window.innerWidth < 768 && activeSubmenu) {
      activeSubmenu.style.display = "none";
      hideVisibleItems(); // Скрываем временно показанные элементы
      activeSubmenu = null;
    }
  });

  // Обработка клика по пункту меню

  








});
