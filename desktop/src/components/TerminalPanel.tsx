import { useState, useRef, useEffect } from 'react'

interface TerminalLine {
  type: 'prompt' | 'output' | 'error' | 'success'
  text: string
}

function TerminalPanel() {
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: 'prompt', text: 'hbreak>' },
    { type: 'output', text: 'Hacker Break v1.0.0 - Cyber Defense System' },
    { type: 'prompt', text: 'hbreak>' },
    { type: 'output', text: 'Sistema online. Digite "help" para comandos.' },
   // { type: 'prompt', text: 'hbreak>' },
  ])
  const [input, setInput] = useState('')
  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [lines])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    
    if (!input.trim()) return
    
    const newLines: TerminalLine[] = [
      ...lines,
      { type: 'prompt', text: 'hbreak>' },
      { type: 'output', text: input }
    ]
    
    const cmd = input.toLowerCase().trim()
    
    switch (cmd) {
      case 'help':
        newLines.push(
          { type: 'output', text: '' },
          { type: 'output', text: 'Comandos disponiveis:' },
          { type: 'output', text: '  scan     - Escaneamento de seguranca' },
          { type: 'output', text: '  monitor  - Iniciar monitoramento' },
          { type: 'output', text: '  shield   - Ativar/desativar escudo' },
          { type: 'output', text: '  block    - Bloquear IP' },
          { type: 'output', text: '  logs     - Ver logs' },
          { type: 'output', text: '  clear    - Limpar terminal' },
          { type: 'output', text: '  status   - Ver status' },
        )
        break
      case 'scan':
        newLines.push(
          { type: 'success', text: `[OK] Escaneamento iniciado...` },
          { type: 'success', text: `[OK] Nenhuma ameaca encontrada` },
        )
        break
      case 'shield':
        newLines.push(
          { type: 'success', text: `[OK] SHIELD ATIVADO` },
        )
        break
      case 'clear':
        setLines([])
        setInput('')
        return
      case 'status':
        newLines.push(
          { type: 'output', text: 'Versao:     1.0.0' },
          { type: 'output', text: 'Shield:    ATIVO' },
          { type: 'output', text: 'AutoBlock:  ATIVO' },
          { type: 'output', text: 'Status:   PROTEGIDO' },
        )
        break
      default:
        if (cmd.startsWith('block ')) {
          const ip = cmd.split(' ')[1]
          newLines.push(
            { type: 'success', text: `[OK] IP ${ip} bloqueado` },
          )
        } else {
          newLines.push(
            { type: 'error', text: `[ERRO] Comando nao reconhecido: ${cmd}` },
          )
        }
    }
    
    newLines.push({ type: 'prompt', text: 'hbreak>' })
    
    setLines(newLines)
    setInput('')
  }

  return (
    <div style={{ padding: '20px', height: 'calc(100vh - 60px)', display: 'flex', flexDirection: 'column' }}>
      <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <h2>TERMINAL</h2>
        
        {/* Terminal Output */}
        <div 
          ref={terminalRef}
          className="terminal"
          style={{ flex: 1, marginTop: '20px', overflow: 'auto' }}
        >
          {/* ASCII Art Header */}
          <pre style={{ color: 'var(--red-primary)', fontSize: '10px', marginBottom: '20px' }}>
{`
 █████╗ ███████╗██╗      █████╗ ██████╗ 
██╔══██╗██╔════╝██║     ██╔══██╗██╔══██╗
██████╔╝█████╗  ██║     ███████║██████╔╝
██╔══██║██╔══╝  ██║     ██╔══██║██╔══██╗
██║  ██║███████╗███████╗██║  ██║██║  ██║
╚═╝  ╚═╝╚══════╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝
`}
          </pre>
          
          {lines.map((line, i) => (
            <div key={i} className="terminal-line">
              {line.type === 'prompt' && (
                <span className="terminal-prompt">{line.text} </span>
              )}
              <span className={
                line.type === 'error' ? 'terminal-error' :
                line.type === 'success' ? 'terminal-success' :
                'terminal-output'
              }>
                {line.text}
              </span>
            </div>
          ))}
        </div>
        
        {/* Input Form */}
        <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <span className="terminal-prompt" style={{ marginTop: '10px' }}>hbreak&gt;</span>
            <input
              type="text"
              className="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Digite um comando..."
              autoFocus
              style={{ fontFamily: 'var(--font-mono)' }}
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default TerminalPanel