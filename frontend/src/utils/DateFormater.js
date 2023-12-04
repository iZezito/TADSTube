export function formatarData(data) {
    // Converte a string da data para um objeto Date
    const dataFornecida = new Date(data);

    // Calcula a diferença em milissegundos
    const diferencaEmMilissegundos = new Date() - dataFornecida;

    // Converte a diferença de milissegundos para segundos, minutos, horas, dias, semanas, meses e anos
    const segundos = Math.floor(diferencaEmMilissegundos / 1000);
    const minutos = Math.floor(segundos / 60);
    const horas = Math.floor(minutos / 60);
    const dias = Math.floor(horas / 24);
    const semanas = Math.floor(dias / 7);
    const meses = Math.floor(dias / 30);
    const anos = Math.floor(dias / 365);

    // Verifica as condições e retorna o resultado formatado
    if (segundos < 60) {
        return `${segundos} segundo${segundos !== 1 ? 's' : ''}`;
    } else if (minutos < 60) {
        return `${minutos} minuto${minutos !== 1 ? 's' : ''}`;
    } else if (horas < 24) {
        return `${horas} hora${horas !== 1 ? 's' : ''}`;
    } else if (dias <= 6) {
        return `${dias} dia${dias !== 1 ? 's' : ''}`;
    } else if (dias <= 30) {
        return `${semanas} semana${semanas !== 1 ? 's' : ''}`;
    } else if (dias <= 365) {
        return `${meses} mês${meses !== 1 ? 'es' : ''}`;
    } else {
        return `${anos} ano${anos !== 1 ? 's' : ''}`;
    }
}