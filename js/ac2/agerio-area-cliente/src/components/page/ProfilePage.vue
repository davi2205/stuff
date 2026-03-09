<template>
    <div class="profile-page">
        <div class="banner"></div>

        <div class="welcome-section">
            <div class="welcome-text">
                <h2>Perfil do Usuário</h2>
                <p class="subtitle">Gerencie suas informações pessoais</p>
            </div>
        </div>

        <div class="content-container">
            <div class="card">
                <h3 class="card-title">Dados Pessoais</h3>
                <p class="card-subtitle">Informações do seu perfil</p>

                <div class="card-content">
                    <div class="profile-info">
                        <div class="info-row">
                            <span class="info-label">Nome:</span>
                            <span class="info-value">Visitante</span>
                        </div>
                        <div class="info-row">
                            <span class="info-label">E-mail:</span>
                            <span class="info-value">visitante@agerio.com.br</span>
                        </div>
                        <div class="info-row">
                            <span class="info-label">Telefone:</span>
                            <span class="info-value">(21) 99999-9999</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ProfilePage'
};
</script>

<style scoped>
.profile-page {
    width: 100%;
}

.banner {
    width: 100%;
    height: 120px;
    background: linear-gradient(135deg, #2c5aa0 0%, #1e7ba6 100%);
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

.subtitle {
    color: #6c757d;
    margin: 0;
    font-size: 1rem;
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

.profile-info {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.info-row {
    display: flex;
    padding: 0.75rem 0;
    border-bottom: 1px solid #e9ecef;
}

.info-row:last-child {
    border-bottom: none;
}

.info-label {
    font-weight: 600;
    min-width: 120px;
    color: #495057;
}

.info-value {
    color: #6c757d;
}

@media (max-width: 768px) {
    .banner {
        height: 80px;
    }

    .welcome-text h2 {
        font-size: 1.5rem;
    }

    .card {
        padding: 1.5rem;
    }

    .info-row {
        flex-direction: column;
        gap: 0.25rem;
    }

    .info-label {
        min-width: auto;
    }
}
</style>
