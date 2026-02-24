<template>
    <div class="example-page">
        <div class="banner"></div>

        <div class="welcome-section">
            <div class="welcome-text">
                <h2>Olá, <span class="user-name">Visitante</span></h2>
                <p class="subtitle">Bem-vindo(a) à página de exemplo.</p>
            </div>
            <div class="date-info">
                {{ formattedDate }}
            </div>
        </div>

        <div class="content-container">
            <div class="card">
                <h3 class="card-title">Exemplo de Conteúdo</h3>
                <p class="card-subtitle">Esta é uma página de exemplo usando Vue Router</p>

                <div class="card-content">
                    <p>Este é um exemplo de página que utiliza:</p>
                    <ul>
                        <li>Vue Router para navegação</li>
                        <li>BasicLayout como layout base</li>
                        <li>SideBar para navegação lateral</li>
                        <li>Options API do Vue 3</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ExamplePage',

    data() {
        return {
            currentDate: new Date()
        };
    },

    computed: {
        formattedDate() {
            const options = {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            };
            return this.currentDate.toLocaleDateString('pt-BR', options);
        }
    }
};
</script>

<style scoped>
.example-page {
    width: 100%;
}

.banner {
    width: 100%;
    height: 120px;
    background: linear-gradient(135deg, #1e7ba6 0%, #2c5aa0 100%);
    border-radius: 12px;
    margin-bottom: 2rem;
}

.welcome-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    flex-wrap: wrap;
    gap: 1rem;
}

.welcome-text h2 {
    font-size: 1.75rem;
    font-weight: 600;
    color: #2c3e50;
    margin: 0 0 0.5rem 0;
}

.user-name {
    color: #1e7ba6;
}

.subtitle {
    color: #6c757d;
    margin: 0;
    font-size: 1rem;
}

.date-info {
    color: #6c757d;
    font-size: 0.95rem;
}

.content-container {
    max-width: 1200px;
}

.card {
    background: white;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 1.5rem;
}

.card-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: #2c3e50;
    margin: 0 0 0.5rem 0;
}

.card-subtitle {
    color: #6c757d;
    margin: 0 0 1.5rem 0;
    font-size: 0.95rem;
}

.card-content {
    color: #495057;
    line-height: 1.6;
}

.card-content ul {
    margin: 1rem 0;
    padding-left: 1.5rem;
}

.card-content li {
    margin: 0.5rem 0;
}

@media (max-width: 768px) {
    .banner {
        height: 80px;
    }

    .welcome-section {
        flex-direction: column;
        align-items: flex-start;
    }

    .welcome-text h2 {
        font-size: 1.5rem;
    }

    .card {
        padding: 1.5rem;
    }
}
</style>