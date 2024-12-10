document.addEventListener("DOMContentLoaded", () => {
    const menuItems = document.querySelectorAll(".list-group-item");
    const submenus = document.querySelectorAll(".submenu");
    const showMoreButtons = document.querySelectorAll('.show-more'); // Все кнопки "Показать больше"
    let activeSubmenu = null;
    let hoverTimeout = null; // Таймер для смены активного меню
    let hideTimeout = null;  // Таймер для скрытия подменю
    let isHovering = false;  // Флаг, показывающий, что пользователь действительно задержался на пункте меню

    // Функция для показа скрытых элементов
    function showMore(button) {
        const targetListId = button.getAttribute('data-target'); // ID целевого списка
        const targetList = document.getElementById(targetListId); // Находим список по ID

        if (targetList) {
            const hiddenItems = targetList.querySelectorAll('.hidden'); // Только скрытые элементы
            hiddenItems.forEach(item => {
                item.classList.remove('hidden'); // Убираем класс hidden
            });

            button.style.display = 'none'; // Скрываем кнопку
        } else {
            console.error(`Список с ID "${targetListId}" не найден`);
        }
    }

    // Функция для сброса только скрытых элементов
    function resetAllShowMore() {
        showMoreButtons.forEach(button => {
            const targetListId = button.getAttribute('data-target'); // ID целевого списка
            const targetList = document.getElementById(targetListId); // Находим список по ID

            if (targetList) {
                // Возвращаем класс .hidden только для тех элементов, которые были изменены
                const allItems = targetList.querySelectorAll('li'); // Все элементы списка
                allItems.forEach(item => {
                    if (item.dataset.hidden === "true") {
                        item.classList.add('hidden'); // Добавляем класс hidden
                    }
                });
                button.style.display = ''; // Делаем кнопку видимой
            }
        });
    }

    // Привязываем обработчики к кнопкам "Показать больше"
    showMoreButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetListId = button.getAttribute('data-target');
            const targetList = document.getElementById(targetListId);
            if (targetList) {
                const hiddenItems = targetList.querySelectorAll('.hidden');
                hiddenItems.forEach(item => {
                    item.classList.remove('hidden');
                    item.dataset.hidden = "true"; // Помечаем, что этот элемент изначально был скрыт
                });
                button.style.display = 'none';
            }
        });
    });

    // Обработчики для пунктов меню
    menuItems.forEach(item => {
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
            }, 300); // Задержка в 300 мс
        });

        item.addEventListener("mouseleave", () => {
            isHovering = false;
        });
    });

    submenus.forEach(submenu => {
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



document.addEventListener('DOMContentLoaded', function () {
    const menuItem = document.getElementById('softFurnitureMenu');
    const submenu = document.getElementById('softFurnitureSubmenu');
    const mainMenu = document.getElementById('mainMenu');
  
    // Переключение видимости подменю при клике на пункт меню
    menuItem.addEventListener('click', function () {
      // Открываем подменю и скрываем основное меню на мобильных устройствах
      submenu.classList.toggle('open');
      mainMenu.style.display = 'none'; // Скрываем основное меню
    });
  
    // Логика для показа скрытых элементов подменю
    const showMoreBtn = document.getElementById('show-more-4');
    const hiddenItems = document.querySelectorAll('.hidden');
  
    showMoreBtn.addEventListener('click', function () {
      hiddenItems.forEach(item => {
        item.style.display = 'block'; // Показываем скрытые элементы
      });
      showMoreBtn.style.display = 'none'; // Скрываем кнопку "Показать еще"
    });
  });
  