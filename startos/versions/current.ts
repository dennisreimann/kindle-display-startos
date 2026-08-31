import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '1.0.0:0',
  releaseNotes: {
    en_US:
      'Initial stable release. Wraps the kindle-display server with StartOS integration: block height, fees, mempool blocks, Lightning statistics, and exchange rates are fetched from a required local Mempool instance and rendered to a grayscale screenshot for a jailbroken Kindle. The display theme (plain, onchain, lightning or random), the exchange-rate currencies, and the update interval are configurable. The Web Interface is served over plain HTTP: the Kindle cannot validate the self-signed TLS certificate an HTTPS address would present, so HTTPS would make the display unreachable. Use the http:// address on your LAN only — the traffic is not encrypted.',
    es_ES:
      'Versión inicial estable. Envuelve el servidor kindle-display con integración StartOS: la altura del bloque, las tarifas, los bloques del mempool, las estadísticas de Lightning y los tipos de cambio se obtienen de una instancia local de Mempool requerida y se renderizan como una captura en escala de grises para un Kindle liberado. El tema de pantalla (plain, onchain, lightning o aleatorio), las monedas de tipo de cambio y el intervalo de actualización son configurables. La interfaz web se sirve mediante HTTP simple: el Kindle no puede validar el certificado TLS autofirmado que presentaría una dirección HTTPS, por lo que HTTPS haría que la pantalla fuera inaccesible. Usa la dirección http:// solo en tu red local: el tráfico no está cifrado.',
    de_DE:
      'Erstveröffentlichung (stabil). Umfasst den kindle-display-Server mit StartOS-Integration: Blockhöhe, Gebühren, Mempool-Blöcke, Lightning-Statistiken und Wechselkurse werden von einer erforderlichen lokalen Mempool-Instanz bezogen und zu einem Graustufen-Screenshot für ein gejailbreaktes Kindle gerendert. Anzeige-Theme (plain, onchain, lightning oder zufällig), Wechselkurs-Währungen und Aktualisierungsintervall sind konfigurierbar. Die Weboberfläche wird über reines HTTP bereitgestellt: Das Kindle kann das selbstsignierte TLS-Zertifikat einer HTTPS-Adresse nicht validieren, daher wäre die Anzeige über HTTPS unerreichbar. Die http://-Adresse nur im eigenen LAN verwenden — der Datenverkehr ist nicht verschlüsselt.',
    pl_PL:
      'Pierwsza stabilna wersja. Obejmuje serwer kindle-display z integracją StartOS: wysokość bloku, opłaty, bloki mempool, statystyki Lightning i kursy wymiany pobierane są z wymaganej lokalnej instancji Mempool i renderowane jako zrzut ekranu w skali szarości dla odblokowanego Kindle. Motyw wyświetlania (plain, onchain, lightning lub losowy), waluty kursów wymiany i interwał aktualizacji są konfigurowalne. Interfejs webowy jest obsługiwany przez zwykły protokół HTTP: Kindle nie może zweryfikować samopodpisanego certyfikatu TLS, który przedstawiałby adres HTTPS, więc HTTPS uniemożliwiałby wyświetlanie. Używaj adresu http:// tylko w sieci lokalnej — ruch nie jest szyfrowany.',
    fr_FR:
      "Première version stable. Encapsule le serveur kindle-display avec l'intégration StartOS : la hauteur du bloc, les frais, les blocs du mempool, les statistiques Lightning et les taux de change sont récupérés depuis une instance Mempool locale requise et rendus en une capture en niveaux de gris pour un Kindle jailbreaké. Le thème d'affichage (plain, onchain, lightning ou aléatoire), les devises de taux de change et l'intervalle de mise à jour sont configurables. L'interface Web est servie en HTTP simple : le Kindle ne peut pas valider le certificat TLS autosigné qu'une adresse HTTPS présenterait, donc HTTPS rendrait l'affichage inaccessible. Utilisez l'adresse http:// sur votre réseau local uniquement — le trafic n'est pas chiffré.",
  },
  migrations: {
    up: async () => {},
    down: IMPOSSIBLE,
  },
})
