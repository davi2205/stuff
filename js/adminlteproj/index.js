
import { Panel } from './components/Panel.js';
import { Card } from './components/Card.js';
import { Button } from './components/Button.js';
import { Input } from './components/Input.js';
import { Layout } from './components/Layout.js';
import { api } from './remote/System.js';
import { setupDefaultPanel } from './shared/componentHelpers.js';

new class {
    constructor() {
        this.build();
    }

    async onButtonClick(button) {
        alert("Você clicou no botão: " + button.title + " " + JSON.stringify(await api.availableRoutes()));
    }

    async build() {
        var panel, layout, card, input, btn;

        panel = new Panel();
        panel.buildAt(document.getElementById('app-root'));
        await setupDefaultPanel(panel);

        layout = new Layout();
        layout.buildAt(panel.bodyElement);

        layout.addCell(4);
        card = new Card();
        card.buildAt(layout.activeCellElement);
        card.title = "My Card 1";

        input = new Input();
        input.buildAt(card.bodyElement);
        input.title = "Nome";
        input.placeholder = "Digite seu nome";

        btn = new Button();
        btn.notifyEventsTo(this);
        btn.buildAt(card.bodyElement);
        btn.title = "Salvar";

        btn = new Button();
        btn.notifyEventsTo(this);
        btn.buildAt(card.bodyElement);
        btn.title = "Editar";

        layout.addCell(4);
        card = new Card();
        card.buildAt(layout.activeCellElement);
        card.title = "My Card 1";

        input = new Input();
        input.buildAt(card.bodyElement);
        input.title = "Nome";
        input.placeholder = "Digite seu nome";

        btn = new Button();
        btn.notifyEventsTo(this);
        btn.buildAt(card.bodyElement);
        btn.title = "Salvar";

        btn = new Button();
        btn.notifyEventsTo(this);
        btn.buildAt(card.bodyElement);
        btn.title = "Editar";

        layout.addCell(4);
        card = new Card();
        card.buildAt(layout.activeCellElement);
        card.title = "My Card 1";

        input = new Input();
        input.buildAt(card.bodyElement);
        input.title = "Nome";
        input.placeholder = "Digite seu nome";

        btn = new Button();
        btn.notifyEventsTo(this);
        btn.buildAt(card.bodyElement);
        btn.title = "Salvar";

        btn = new Button();
        btn.notifyEventsTo(this);
        btn.buildAt(card.bodyElement);
        btn.title = "Editar";
    }
}    