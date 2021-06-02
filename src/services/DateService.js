class DateService {

    transformDate(dateToTransform) {
        const [date] = dateToTransform.split('T')
        const [year, month, day] = date.split('-')
        return `${day}/${month}/${year}`

    }
}

export default new DateService()