import React from 'react';
import { RotateCcw, AlertTriangle, RefreshCw } from 'lucide-react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("TITRA Application Runtime Error caught by ErrorBoundary:", error, errorInfo);
    this.setState({ errorInfo });
  }

  handleResetStorage = () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
      window.location.reload();
    } catch (e) {
      window.location.reload();
    }
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6 font-sans">
          <div className="max-w-xl w-full bg-slate-900 border-2 border-rose-500/50 rounded-3xl p-8 shadow-2xl space-y-6 text-center">
            
            <div className="w-16 h-16 bg-rose-500/20 text-rose-400 border border-rose-500/40 rounded-2xl flex items-center justify-center mx-auto">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-white">
                ระบบพบข้อผิดพลาดชั่วคราวในการแสดงผล
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                ระบบตรวจพบข้อผิดพลาดในการประมวลผลหน้าจอ สามารถกดปุ่มด้านล่างเพื่อกู้คืนสถานะการสืบสวนและเริ่มใหม่ได้ทันที
              </p>
            </div>

            {this.state.error && (
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs font-mono text-rose-300 text-left overflow-x-auto max-h-36">
                {this.state.error.toString()}
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={this.handleReload}
                className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-white font-semibold px-6 py-3 rounded-xl text-sm flex items-center justify-center gap-2 border border-slate-700 transition-all"
              >
                <RefreshCw className="w-4 h-4" />
                <span>โหลดหน้านี้ใหม่ (Refresh)</span>
              </button>

              <button
                type="button"
                onClick={this.handleResetStorage}
                className="w-full sm:w-auto bg-sky-600 hover:bg-sky-500 text-white font-bold px-6 py-3 rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                <span>รีเซ็ตระบบและเริ่มคดีใหม่ (Reset & Recover)</span>
              </button>
            </div>

          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
