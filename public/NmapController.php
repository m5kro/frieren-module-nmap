<?php

namespace frieren\modules\nmap;

class NmapController extends \frieren\core\Controller
{
    private $nmapDirectory = '/root/.nmap';
    private $logPath = '/tmp/nmap.log';

    protected $endpointRoutes = [
        'checkModuleDependencies',
        'installModuleDependencies',
        'getDependencyInstallationStatus',
        'startScan',
        'stopScan',
        'getHistory',
        'getLogContent',
        'deleteHistory',
        'moduleStatus',
    ];

    public function startScan()
    {
        if (!isset($this->request['command'])) {
            return self::setError('No command provided');
        }

        $filename = date('Y-m-d\TH-i-s') . '.log';
        $logFilePath = "{$this->nmapDirectory}/{$filename}";
        $command = escapeshellcmd($this->request['command']);
        
        // Run Nmap scan with output to /tmp/nmap.log, then copy to /root/.nmap/
        exec("nmap {$command} -oN {$this->logPath} 2>&1", $output, $resultCode);
        if ($resultCode !== 0) {
            return self::setError('Failed to start scan');
        }
        exec("cp {$this->logPath} {$logFilePath}");

        return self::setSuccess([
            'outputFile' => $filename,
        ]);
    }

    public function stopScan()
    {
        exec('killall -9 nmap');
        return self::setSuccess([
            'success' => shell_exec('pgrep nmap') === null,
        ]);
    }

    public function getHistory()
    {
        $files = array_diff(scandir($this->nmapDirectory), ['..', '.']);
        $files = array_filter($files, function($file) {
            return is_file("{$this->nmapDirectory}/{$file}");
        });

        return self::setSuccess(['files' => array_values($files)]);
    }

    public function getLogContent()
    {
        if (!file_exists($this->logPath)) {
            return self::setError("Could not find log output: {$this->logPath}");
        }

        return self::setSuccess([
            'isRunning' => file_exists($this->logPath) && shell_exec('pgrep nmap') !== null,
            'logContent' => file_get_contents($this->logPath),
        ]);
    }

    public function deleteHistory()
    {
        $filename = $this->request['filename'];
        $filePath = "{$this->nmapDirectory}/{$filename}";
        if (file_exists($filePath)) {
            unlink($filePath);
            return self::setSuccess();
        }

        return self::setError('File does not exist.');
    }

    public function moduleStatus()
    {
        // Ensure the Nmap directory exists
        if (!file_exists($this->nmapDirectory)) {
            mkdir($this->nmapDirectory, 0777, true);
        }

        return self::setSuccess([
            'hasDependencies' => shell_exec('which nmap') !== null,
            'isRunning' => file_exists($this->logPath) && shell_exec('pgrep nmap') !== null,
        ]);
    }
}
