import {html, render} from 'https://unpkg.com/lit-html?module';
import FileService from './file.service.js';


// This uses lit-html (see readme)
const template = document.createElement("template");
template.innerHTML = `<div id="wrapper">
</div>`;

const style = document.createElement("style");
style.textContent = `

`;

export default class DirectoriesComponent extends HTMLElement {


    constructor() {
        super();

        const shadow = this.attachShadow({mode: "open"});
        shadow.appendChild(style.cloneNode(true));

        this._wrapper = template.content.cloneNode(true);
        shadow.appendChild(this._wrapper);
        this._update();
    }

    async _update() {
        let directoriesTemplate = (directory) => html`
            <table>
                <thead>
                    <tr>
                        <th>File Name</th>
                        <th>Size (Bytes)</th>
                        <th>Date Created</th>
                        <th>Date Modified</th>
                    </tr>
                </thead>
                <tbody>
                ${directory.files.map((file) => html`
                    <tr>
                        <td><a href="/api/file/download/${directory.relativePath}/${file.name}">${file.name}</a></td>
                        <td>${file.sizeBytes}</td>
                        <td>${new Date(file.dateCreated).toLocaleDateString()}</td>
                        <td>${new Date(file.dateModified).toLocaleDateString()}</td>
                        <td><button>Delete</button></td>
                    </tr>
                `)}
                ${directory.subDirectories.map((dir) => html`
                    <tr>
                        <td>${dir}</a></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td><button>Delete</button></td>
                    </tr>
                `)}
                </tbody>
            </table>
        `;

        var file_service = new FileService();
        let directory = await file_service.GetDirectory();
        console.log(directory);
        console.log(this);
        render(directoriesTemplate(directory), this.shadowRoot.getElementById("wrapper"));
        console.log('rendered');
    }
}

customElements.define("demo-directories", DirectoriesComponent);