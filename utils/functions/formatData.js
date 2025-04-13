export const formatCalendarAsDate = (datetime) => {
    try {
        return datetime ? datetime.toISOString().split('T')[0] : null;
    } catch (e) {
        return false;
    }
};

export const formatMaskAsNumber = (value) => {
    try {
        return value ? value.replace(/[^\d]/g, '') : null;
    } catch (e) {
        return false;
    }
};

export const formatDateAsCalendar = (date) => {
    try {
        return date ? new Date(date + ' 00:00') : null;
    } catch (e) {
        return false;
    }
};

export const formatDateAsString = (date) => {
    try {
        return date ? new Date(date).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            timeZone: 'UTC',
        }) : null;
    } catch (e) {
        return false;
    }
};

export const formatNumberAsPhone = (value) => {
    try {
        return `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
    } catch (e) {
        return false;
    }
};

export const formatNumberAsCpfCnpj = (value) => {
    try {
        return value.length > 11 ?
            value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5') :
            value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    } catch (e) {
        return false;
    }
};

export const formatNumberAsCurrency = (value) => {
    let valor = Number(value);
    try {
        return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    } catch (e) {
        return false;
    }
};

export const formatNumberAsLocale = (value) => {
    let valor = Number(value);
    try {
        return valor.toLocaleString('pt-BR');
    } catch (e) {
        return false;
    }
};

