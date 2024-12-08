function updateNetworkTable(networkData) {
    const networkTable = document.getElementById('network-table');
    if (networkTable) {
        networkTable.innerHTML = networkData.split('\n').map(row => {
            const [iface, ip] = row.split('|');
            return `<tr>
                        <td>${iface}</td>
                        <td>${ip}</td>
                    </tr>`;
        }).join('');
    }
}
