import { api } from "../app/Api.js";
import { Panel } from "../components/Panel.js";

/**
 * @param {Panel} panel
 */
export async function setupDefaultPanel(panel) {
    function recursivelyInsertMenuItemsFromParts(menu, parts, header = false) {
        var menuItem, title;
        if (parts.length > 1) {
            title = (header ? parts[0].toUpperCase() : parts[0]).trim();
            menuItem = menu.find(mi => mi.title === title);
            if (!menuItem) {
                menuItem = {
                    title,
                    icon: 'far fa-fw fa-circle',
                    isHeader: header,
                    subMenu: new Array()
                };
                menu.push(menuItem);
            }
            recursivelyInsertMenuItemsFromParts(menuItem.subMenu, parts.slice(1));
        } else {
            title = parts[0].trim();
            menuItem = menu.find(mi => mi.title === title);
            if (!menuItem) {
                menuItem = {
                    title,
                    icon: 'far fa-fw fa-circle',
                    link: '#'
                };
                menu.push(menuItem);
            }
        }
    }

    var panelInfo, menu, menuItem;

    panelInfo = await api.panelInfo();

    menu = new Array();
    for (menuItem of panelInfo.menu) {
        recursivelyInsertMenuItemsFromParts(menu, menuItem.title.split('/'), true);
    }

    panel.brandTitle = panelInfo.title; 
    panel.menu = menu;   
}