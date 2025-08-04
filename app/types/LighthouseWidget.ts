export interface LighthouseWidgetProps {
    Title: string,
    Image: {
        data: {
            attributes: {
                url: string,
                alternativeText: string,
            }
        }
    }
}