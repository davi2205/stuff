
// import { Listeners } from "./Listeners.js";
import { generateUniqueId, htmlElement, associateObject } from "../shared/htmlHelpers.js";

export class Panel {
    #id;
    // #listeners;

    constructor() {
        this.#id = generateUniqueId('panel-');
        // this.#listeners = new Listeners({ requiredMethods: [] });
    }

    buildAt(targetElement) {
        if (this.element) {
            throw new Error('Panel already built');
        }

        targetElement.appendChild(htmlElement(/*html*/`
            <div class="wrapper" id="${this.#id}">
                <!-- Navbar -->
                <nav class="main-header navbar navbar-expand navbar-white navbar-light">
                    <!-- Left navbar links -->
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
                        </li>
                    </ul>

                    <!-- Right navbar links -->
                    <ul class="navbar-nav ml-auto">
                        <!-- Notifications Dropdown Menu -->
                        <li class="nav-item dropdown">
                            <a class="nav-link" data-toggle="dropdown" href="#">
                                <i class="far fa-bell"></i>
                                <span class="badge badge-warning navbar-badge">15</span>
                            </a>
                            <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                                <span class="dropdown-header">15 Notifications</span>
                                <div class="dropdown-divider"></div>
                                <a href="#" class="dropdown-item">
                                    <i class="fas fa-envelope mr-2"></i> 4 new messages
                                    <span class="float-right text-muted text-sm">3 mins</span>
                                </a>
                                <div class="dropdown-divider"></div>
                                <a href="#" class="dropdown-item">
                                    <i class="fas fa-users mr-2"></i> 8 friend requests
                                    <span class="float-right text-muted text-sm">12 hours</span>
                                </a>
                                <div class="dropdown-divider"></div>
                                <a href="#" class="dropdown-item">
                                    <i class="fas fa-file mr-2"></i> 3 new reports
                                    <span class="float-right text-muted text-sm">2 days</span>
                                </a>
                                <div class="dropdown-divider"></div>
                                <a href="#" class="dropdown-item dropdown-footer">See All Notifications</a>
                            </div>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" data-widget="fullscreen" href="#" role="button">
                                <i class="fas fa-expand-arrows-alt"></i>
                            </a>
                        </li>
                    </ul>
                </nav>
                <!-- /.navbar -->

                <!-- Main Sidebar Container -->
                <aside class="main-sidebar sidebar-dark-primary elevation-4">
                    <!-- Brand Logo -->
                    <a href="index3.html" class="brand-link text-center">
                        <!--
                        <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" class="brand-image img-circle elevation-3"
                            style="opacity: .8">
                            -->
                        <span class="brand-text font-weight-light"></span>
                    </a>

                    <!-- Sidebar -->
                    <div class="sidebar">
                        <!-- Sidebar Menu -->
                        <nav class="mt-2">
                            <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu"
                                data-accordion="false">
                            </ul>
                        </nav>
                        <!-- /.sidebar-menu -->
                    </div>
                    <!-- /.sidebar -->
                </aside>

                <!-- Content Wrapper. Contains page content -->
                <div class="content-wrapper" style="min-height: 618.4px;">
                    <!-- Content Header (Page header) -->
                    <div class="content-header">
                        <div class="container-fluid">
                            <div class="row mb-2">
                                <div class="col-sm-6">
                                    <h1 class="m-0">Starter Page</h1>
                                </div><!-- /.col -->
                                <div class="col-sm-6">
                                    <ol class="breadcrumb float-sm-right">
                                    </ol>
                                </div><!-- /.col -->
                            </div><!-- /.row -->
                        </div><!-- /.container-fluid -->
                    </div>
                    <!-- /.content-header -->

                    <!-- Main content -->
                    <div class="content">
                        <div class="container-fluid">
                        </div><!-- /.container-fluid -->
                    </div>
                    <!-- /.content -->
                </div>
                <!-- /.content-wrapper -->
                

                <!-- Control Sidebar -->
                <aside class="control-sidebar control-sidebar-dark" style="display: none;">
                    <!-- Control sidebar content goes here -->
                    <div class="p-3">
                        <h5>Title</h5>
                        <p>Sidebar content</p>
                    </div>
                </aside>
                <!-- /.control-sidebar -->

                <div id="sidebar-overlay"></div>
            </div>
        `));

        associateObject(this.element, this);
    }

    set brandTitle(title) {
        document.querySelector(`#${this.#id} .brand-link .brand-text`).textContent = title;
    }

    /**
     * @param {Array<{title: string, link: string, active?: boolean}>} items
     */
    set breadcrumbs(items) {
        document.querySelector(`#${this.#id} .breadcrumb`).innerHTML = items.map(item => {
            if (item.active) {
                return `<li class="breadcrumb-item active">${item.title}</li>`;
            } else {
                return `<li class="breadcrumb-item"><a href="${item.link}">${item.title}</a></li>`;
            }
        }).join('');
    }   

    /**
    * @param {Array<{title: string, icon: string, link: string, active?: boolean, subMenu?: Array}>} items
    */
    set menu(items) {
        function generateMenuItemsHtml(items) {
            return items.map(item => {
                if (item.subMenu && item.subMenu.length > 0) {
                    if (!item.isHeader) {
                        return /*html*/`
                            <li class="nav-item ${item.active ? 'menu-open' : ''}">
                                <a href="${item.link || '#'}" class="nav-link ${item.active ? 'active' : ''}">
                                    <i class="nav-icon ${item.icon}"></i>
                                    <p>
                                        ${item.title} <i class="right fas fa-angle-left"></i>
                                    </p>
                                </a>
                                <ul class="nav nav-treeview">
                                    ${generateMenuItemsHtml(item.subMenu)}
                                </ul>
                            </li>
                        `;
                    } else {
                        return /*html*/`
                            <li class="nav-header">${item.title}</li>
                            ${generateMenuItemsHtml(item.subMenu)}
                        `;
                    }
                } else {
                    return /*html*/`
                        <li class="nav-item">
                            <a href="${item.link || '#'}" class="nav-link ${item.active ? 'active' : ''}">
                                <i class="nav-icon ${item.icon}"></i>
                                <p>${item.title}</p>
                            </a>
                        </li>
                    `;
                }
            }).join('');
        }

        document.querySelector(`#${this.#id} .nav-sidebar`).innerHTML = generateMenuItemsHtml(items);
    }

    get element() {
        return document.querySelector(`#${this.#id}`);
    }

    get bodyElement() {
        return document.querySelector(`#${this.#id} .content .container-fluid`);
    }
}