export const convertISOToDate = (dateString: string): Date => {
    const [year, week] = dateString.split('-')
    const days: number = 1 + (Number(week.slice(1)) - 1) * 7

    return new Date(Number(year), 0, days)
}