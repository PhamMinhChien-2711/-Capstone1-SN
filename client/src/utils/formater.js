export const getTimeDistanceFromNow = (startDate) => {
    startDate = new Date(startDate)
    const now = new Date()

    const secondDistance = (now.getTime() - startDate.getTime()) / 1000
    const minutesDistance = secondDistance / 60
    const hoursDistance = minutesDistance / 60
    const dateDistance = hoursDistance / 24
    const monthDistance = dateDistance / 31

    if (monthDistance >= 12) {
        const year = monthDistance / 12
        return Math.round(year) + ' năm trước'
    }

    if (dateDistance >= 31) {
        const month = dateDistance / 31
        return Math.round(month) + ' tháng trước'
    }

    if (hoursDistance >= 24) {
        const day = hoursDistance / 24
        return Math.round(day) + ' ngày trước'
    }

    if (minutesDistance >= 60) {
        const hours = minutesDistance / 60
        return Math.round(hours) + ' giờ trước'
    }

    if (minutesDistance < 1) {
        return 'Vừa mới đây'
    }

    if (minutesDistance < 60) {
        return Math.round(minutesDistance) + ' phút trước'
    }

    return '1 phút trước'
}