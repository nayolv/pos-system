export const getLocation = (): string => {
    const protocol = window.location.protocol;
    const hostname = window.location.hostname;
    const port = window.location.port;

    return port ? `${protocol}//${hostname}:${port}` : `${hostname}`
}