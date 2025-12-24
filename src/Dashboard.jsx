import React, { useState } from 'react';
import { 
  LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, 
  CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart 
} from 'recharts';
import { 
  TrendingUp, TrendingDown, AlertCircle, Clock, FileText, Database, 
  Zap, CheckCircle, AlertTriangle, Info, Activity, ArrowRight, 
  Target, Calendar, HelpCircle 
} from 'lucide-react';
const Dashboard = () =>{
  const [activeView, setActiveView] = useState('executive');

  // === SUPPORT HOURS DATA (UPDATED FROM EXCEL SUMMARY SHEET) ===
  const supportHoursData = [
    { month: 'May', hours: 26.0, change: 0, source: 'Excel Summary', incidents: 8, resolved: 8 },
    { month: 'Jun', hours: 40.0, change: 54, source: 'Excel Summary', incidents: 12, resolved: 11 },
    { month: 'Jul', hours: 61.5, change: 54, source: 'Excel Summary', incidents: 18, resolved: 16 },
       { month: 'Aug', hours: 68.0, change: 11, source: 'Excel Summary', incidents: 15, resolved: 14 },
    { month: 'Sep', hours: 147.0, change: 149, source: 'Excel Summary', incidents: 22, resolved: 20 },
    { month: 'Oct', hours: 108.0, change: -27, source: 'Excel Summary', incidents: 12, resolved: 12 }
  ];

  // Recalculate Oct % change based on actual data
  const sepHours = supportHoursData[4].hours;
  const octHours = supportHoursData[5].hours;
  supportHoursData[5].change = Math.round(((octHours - sepHours) / sepHours) * 100);

  const totalHours = supportHoursData.reduce((sum, m) => sum + m.hours, 0).toFixed(1);
  const mayHours = supportHoursData[0].hours;
  const mayToOctPct = Math.round(((octHours - mayHours) / mayHours) * 100);

  // === DEPLOYMENT DATA (ONLY 4 FROM SHEET1 - OFFICE SCRIPT MOVED TO R&D) ===
  const deploymentData = [
    {
      sNo: 1,
      month: 'July',
      deployment: 'Yes',
      enhancement: 'Yes',
      reason: 'CBS System change',
      issue: 'Change in CBS - Query button selector',
      resolution: 'Updated the selector and deployed in production',
      hours: 16
    },
    {
      sNo: 2,
      month: 'August',
      deployment: 'Yes',
      enhancement: 'Yes',
      reason: 'CBS System change',
      issue: 'Change in CBS - Prod URL change',
      resolution: 'Updated URL, tested & deployed in production',
      hours: 8
    },
    {
      sNo: 3,
      month: 'September',
      deployment: 'Yes',
      enhancement: 'Yes',
      reason: 'Duplicate queue item addition',
      issue: 'Due to cloud excel, formatting of data (UTR number with trailing zeros) is changing which is resulting in duplicate queue item addition.',
      resolution: 'Updated logic ensured there are no duplicates being added.',
      hours: 67
    },
    {
      sNo: 4,
      month: 'October',
      deployment: 'Yes',
      enhancement: 'Yes',
      reason: 'CBS System change',
      issue: 'Change in CBS - dropdown selector changed',
      resolution: 'Updated the selector and deployed in production',
      hours: 36.5
    }
  ];

  const totalDeploymentHours = deploymentData.reduce((sum, d) => sum + d.hours, 0).toFixed(1);
  const deploymentPct = ((totalDeploymentHours / totalHours) * 100).toFixed(1);

  // === ENHANCEMENT TREND (NEW CHART DATA FROM SUMMARY) ===
  const enhancementTrend = [
    { month: 'Jul', hours: 16 },
    { month: 'Aug', hours: 8 },
    { month: 'Sep', hours: 67 },
    { month: 'Oct', hours: 36.5 }
  ];

  // === ISSUE TIMELINE (UPDATED FOR OCTOBER FULL DATA) ===
  const issueTimeline = [
    {
      category: 'Excel / Cloud Excel Dependence(Client Dependent)',
      may: 'high', jun: 'high', jul: 'high', aug: 'high', sep: 'high', oct: 'medium',
      description: 'Office Script Move-to-Archive deployed in Oct',
      impact: 'High',
      trend: 'Improving - Office Scripts',
      trendShort: 'Improving'
    },
    {
      category: 'Duplicate / Re-queue Records',
      may: 'low', jun: 'medium', jul: 'high', aug: 'high', sep: 'medium', oct: 'none',
      description: 'No duplication incidents in October monitored runs',
      impact: 'Medium',
      trend: 'Resolved',
      trendShort: 'Resolved'
    },
    {
      category: 'Connector / API Throttling & OTP',
      may: 'medium', jun: 'medium', jul: 'medium', aug: 'medium', sep: 'medium', oct: 'low',
      description: 'Reduced via Office Scripts',
      impact: 'Low',
      trend: 'Managed',
      trendShort: 'Recurring'
    },
    {
      category: 'UI Element Changes (CBS Dependent)',
      may: 'none', jun: 'none', jul: 'high', aug: 'medium', sep: 'low', oct: 'high',
      description: 'Invoice dropdown & INR selector issues',
      impact: 'High',
      trend: 'Recurring',
      trendShort: 'Recurring'
    },
    {
      category: 'Flow / Query Logic Errors',
      may: 'none', jun: 'medium', jul: 'medium', aug: 'low', sep: 'low', oct: 'low',
      description: 'Date format & exit loops fixed',
      impact: 'Low',
      trend: 'Stable',
      trendShort: 'Stable'
    }
  ];

  // === ROOT CAUSES (UNCHANGED) ===
  const rootCauses = [
    {
      cause: 'Excel File Fragility',
      severity: 'Critical',
      frequency: 'Continuous',
      impact: 'Largest driver of incidents',
      status: 'Migration planned (Medium-term)'
    },
    {
      cause: 'Queue Duplication Logic',
      severity: 'High',
      frequency: 'Jul–Sep',
      impact: 'Manual cleanup & reprocessing',
      status: 'Resolved via duplicate detection (Sep)'
    },
    {
      cause: 'Platform Limits (Connectors/OTP)',
      severity: 'Low',
      frequency: 'Persistent',
      impact: 'Intermittent failures',
      status: 'Mitigated via Office Scripts'
    },
    {
      cause: 'UI Element Brittleness',
      severity: 'High',
      frequency: 'Jul, Aug, Oct',
      impact: 'Automation exceptions',
      status: 'Selector hardening applied'
    }
  ];

  // === HELPERS ===
  const getHeatmapColor = (level) => {
    const colors = { 'none': '#f3f4f6', 'low': '#86efac', 'medium': '#fbbf24', 'high': '#f87171' };
    return colors[level];
  };

  const getSeverityColor = (severity) => {
    const colors = {
      'Critical': 'bg-red-100 text-red-800 border-red-300',
      'High': 'bg-orange-100 text-orange-800 border-orange-300',
      'Medium': 'bg-yellow-100 text-yellow-800 border-yellow-300',
      'Low': 'bg-green-100 text-green-800 border-green-300'
    };
    return colors[severity] || 'bg-gray-100 text-gray-800 border-gray-300';
  };

  const TooltipInfo = ({ text }) => (
    <div className="relative inline-block ml-1">
      <HelpCircle className="w-4 h-4 text-gray-400 cursor-help peer" />
      <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 peer-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
        {text}
        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 w-0 h-0 border-4 border-transparent border-t-gray-800"></div>
      </div>
    </div>
  );

  const MetricCard = ({ title, value, change, trend, icon: Icon, alert, tooltip }) => (
    <div className={`bg-white rounded-lg shadow-md p-5 border-l-4 ${alert ? 'border-red-500' : 'border-blue-500'}`}>
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-1">
            <p className="text-sm font-medium text-gray-600">{title}</p>
            {tooltip && <TooltipInfo text={tooltip} />}
          </div>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`p-3 rounded-lg ${alert ? 'bg-red-50' : 'bg-blue-50'}`}>
          <Icon className={`w-7 h-7 ${alert ? 'text-red-600' : 'text-blue-600'}`} />
        </div>
      </div>
      {change !== undefined && (
        <div className="flex items-center gap-2">
          {trend === 'up' ? <TrendingUp className="w-4 h-4 text-red-600" /> : <TrendingDown className="w-4 h-4 text-green-600" />}
          <span className={`text-sm font-medium ${trend === 'up' ? 'text-red-600' : 'text-green-600'}`}>
            {change > 0 ? '+' : ''}{change}% vs previous
          </span>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white shadow-xl">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <a
  href="https://coscoamcmonitor.vercel.app/"
  className="inline-flex items-center gap-2 text-sm text-blue-100 hover:text-white mb-3"
>
  <b><u>Back</u></b>
</a>

          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold mb-1">COSCO Automation Monitoring</h1>
              <p className="text-blue-100 text-sm">Six-Month Performance Review: May – October 2025</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-blue-100 mb-1">Report Date</div>
              <div className="text-lg font-semibold">November 11, 2025</div>
            </div>
          </div>
        </div>
      </div>

       {/* Quick Stats Banner */}
{/* ==== QUICK STATS BANNER – 9 CARDS (2 ROWS) ==== */}
<div className="bg-white border-b shadow-sm">
  <div className="max-w-7xl mx-auto px-6 py-4">
    
    {/* ROW 1: ORIGINAL 5 */}
    <div className="grid grid-cols-5 gap-4 mb-3">
      {/* 1. Total Support */}
      <div className="text-center">
        <div className="text-2xl font-bold text-gray-900">441.5 hrs</div>
        <div className="text-xs text-gray-600 flex items-center justify-center gap-1">
          Total Support
         
        </div>
      </div>

      {/* 2. Deployments */}
      <div className="text-center">
        <div className="text-2xl font-bold text-blue-600">195 hrs</div>
        <div className="text-xs text-gray-600">Regular Maintenance</div>
      </div>

      {/* 3. Enhancements */}
      <div className="text-center">
        <div className="text-2xl font-bold text-green-600">37.5 hrs</div>
        <div className="text-xs text-gray-600">Issue/Bugs</div>
      </div>

      {/* 4. Resolved */}
      <div className="text-center">
        <div className="text-2xl font-bold text-amber-600">81.5 hrs</div>
        <div className="text-xs text-gray-600">R&D</div>
      </div>

      {/* 5. Oct vs Sep */}
      <div className="text-center">
        <div className="text-2xl font-bold text-red-600">127.5 hrs</div>
        <div className="text-xs text-gray-600">CR/Enhancements</div>
      </div>
    </div>

    {/* ROW 2: NEW METRICS FROM EXCEL SUMMARY */}
    <div className="grid grid-cols-5 gap-4">
      {/* 1. Total Incidents */}
      <div className="text-center">
        <div className="text-2xl font-bold text-black-600">159</div>
        <div className="text-xs text-gray-600">Total Incidents</div>
      </div>

      {/* 2. Regular Maintenance */}
      <div className="text-center">
        <div className="text-2xl font-bold text-blue-700">99</div>
        <div className="text-xs text-gray-600">Regular Maintenance</div>
      </div>

      {/* 3. Issue/Bug */}
      <div className="text-center">
        <div className="text-2xl font-bold text-green-600">9</div>
        <div className="text-xs text-gray-600">Issue/Bugs</div>
      </div>

      {/* 4. R&D */}
      <div className="text-center">
        <div className="text-2xl font-bold text-amber-600">23</div>
        <div className="text-xs text-gray-600">R&D</div>
      </div>
          {/* 5. CR/Enhancements */}
      <div className="text-center">
        <div className="text-2xl font-bold text-red-600">28</div>
        <div className="text-xs text-gray-600">CR/Enhancements</div>
      </div>

    </div>

  </div>
</div>
{/* ==== END BANNER ==== */}


      {/* Navigation */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-1">
            {[
              { id: 'executive', label: 'Executive Summary', icon: Target },
              { id: 'trends', label: 'Trends & Analytics', icon: TrendingUp },
              { id: 'issues', label: 'Issue Analysis', icon: AlertCircle },
              { id: 'rootcause', label: 'Root Causes', icon: Activity },
              { id: 'actions', label: 'Actions & Roadmap', icon: CheckCircle }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveView(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-all ${
                  activeView === tab.id
                    ? 'border-blue-600 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="text-sm font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* === EXECUTIVE SUMMARY === */}
        {activeView === 'executive' && (
          <div className="space-y-6">
            {/* Key Findings */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Info className="w-6 h-6 text-blue-600" /> Key Findings (May - October 2025)
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 border border-green-200 shadow-sm">
                  <div className="flex items-start gap-3">
                    <Target className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Consistent Stabilisation Achieved</h4>
                      <p className="text-sm text-gray-700">
                        Only <strong>9</strong> issues/bugs from May - Oct 2025                   
                      </p>
                                            <p className="text-sm text-green-700">
                                              <br></br>      
                         *<strong>120 hours of regular maintenance from Nov'24 to Apr'25  </strong>
                                 
                      </p>
                      
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 border border-blue-100">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Excel Dependency Reduced(Client Dependent)</h4>
                      <p className="text-sm text-gray-700">
                        <strong>Office Scripts</strong> cut Power Automate actions & throttling
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 border border-blue-100">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">No Duplicates in Oct</h4>
                      <p className="text-sm text-gray-700">
                        Duplicate detection logic + merged flows = <strong>0 incidents</strong>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 border border-blue-100">
                  <div className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Over Extended Support</h4>
                      <p className="text-sm text-red-700">
                        <strong>441 hours</strong> of support from May - Oct 2025 vis-a-vis <strong>360 hours</strong> of Annual Committed Support Hours
                      <br></br>
                      <br></br>
                      <strong>81.5 hrs R&D hours</strong> were invested in identifying workaround for Cloud Excel Issues
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Metric Cards */}
            <div className="grid grid-cols-4 gap-4">
              <MetricCard title="October (full)" value="108 hrs" change={-27} trend="down" icon={Clock} tooltip="108 hrs vs Sep 147 hrs" />
              <MetricCard title="6-Month Total" value={`441.5 hrs`} icon={Activity} />
              <MetricCard title="Peak Month" value="Sep: 147 hrs" icon={AlertTriangle} alert />
              <MetricCard title="Excel Impact" value="Critical" icon={FileText} alert tooltip="Primary root cause" />
            </div>

            {/* Support Hours Trend */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Support Hours Trend (May - Oct 2025)</h3>
              <ResponsiveContainer width="100%" height={300}>
                <ComposedChart data={supportHoursData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#6b7280" />
                  <YAxis yAxisId="left" stroke="#6b7280" label={{ value: 'Hours', angle: -90, position: 'insideLeft' }} />
                  <YAxis yAxisId="right" orientation="right" stroke="#6b7280" label={{ value: '% Change (MoM)', angle: 90, position: 'insideRight' }} />
                  <Tooltip formatter={(v, n) => n === 'change' ? `${v}%` : `${v} hrs`} />
                  <Legend />
                  <Bar yAxisId="left" dataKey="hours" fill="#3b82f6" radius={[8, 8, 0, 0]} name="Support Hours" />
                  <Line yAxisId="right" type="monotone" dataKey="change" stroke="#ef4444" strokeWidth={3} dot={{ r: 5 }} name="MoM % Change" />
                </ComposedChart>
              </ResponsiveContainer>

            </div>

            {/* Enhancements & Deployments Table */}
            {/* Monthly Support Breakdown (Summary Sheet) */}
            <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                Monthly Support Breakdown (Summary Sheet)
              </h3>

              <div className="overflow-x-auto border border-gray-200 rounded-lg">
                <table className="w-full text-xs">
                  <thead className="bg-blue-50 border-b border-blue-200">
                    <tr>
                      <th className="px-3 py-2 text-left font-semibold text-blue-900">Month</th>
                      <th className="px-3 py-2 text-center font-semibold text-blue-900">CR/Enhancement</th>
                      <th className="px-3 py-2 text-center font-semibold text-blue-900">Issue/Bug</th>
                      <th className="px-3 py-2 text-center font-semibold text-blue-900">R&D</th>
                      <th className="px-3 py-2 text-center font-semibold text-blue-900">Regular Maintenance</th>
                      <th className="px-3 py-2 text-right font-semibold text-blue-900">Grand Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {/* May */}
                    <tr className="hover:bg-blue-50/30">
                      <td className="px-3 py-2 font-medium text-gray-900">May-25</td>
                      <td className="px-3 py-2 text-center">0</td>
                      <td className="px-3 py-2 text-center">0</td>
                      <td className="px-3 py-2 text-center">0</td>
                      <td className="px-3 py-2 text-center text-gray-900">26.0</td>
                      <td className="px-3 py-2 text-right font-semibold text-gray-900">26.0</td>
                    </tr>
                    {/* June */}
                    <tr className="hover:bg-blue-50/30">
                      <td className="px-3 py-2 font-medium text-gray-900">Jun-25</td>
                      <td className="px-3 py-2 text-center">0</td>
                      <td className="px-3 py-2 text-center">0</td>
                      <td className="px-3 py-2 text-center">0</td>
                      <td className="px-3 py-2 text-center text-gray-900">40.0</td>
                      <td className="px-3 py-2 text-right font-semibold text-gray-900">40.0</td>
                    </tr>
                    {/* July */}
                    <tr className="hover:bg-blue-50/30">
                      <td className="px-3 py-2 font-medium text-gray-900">Jul-25</td>
                      <td className="px-3 py-2 text-center text-green-600">16.0</td>
                      <td className="px-3 py-2 text-center text-orange-600">19.5</td>
                      <td className="px-3 py-2 text-center">0</td>
                      <td className="px-3 py-2 text-center">26</td>
                      <td className="px-3 py-2 text-right font-semibold text-gray-900">61.5</td>
                    </tr>
                    {/* August */}
                    <tr className="hover:bg-blue-50/30">
                      <td className="px-3 py-2 font-medium text-gray-900">Aug-25</td>
                      <td className="px-3 py-2 text-center text-green-600">8.0</td>
                      <td className="px-3 py-2 text-center text-orange-600">18.0</td>
                      <td className="px-3 py-2 text-center">0</td>
                      <td className="px-3 py-2 text-center">33</td>
                      <td className="px-3 py-2 text-right font-semibold text-gray-900">59.0</td>
                    </tr>
                    {/* September */}
                    <tr className="hover:bg-blue-50/30">
                      <td className="px-3 py-2 font-medium text-gray-900">Sept-25</td>
                      <td className="px-3 py-2 text-center text-green-600">67.0</td>
                      <td className="px-3 py-2 text-center text-orange-600">0.0</td>
                      <td className="px-3 py-2 text-center">34.0</td>
                      <td className="px-3 py-2 text-center">46.0</td>
                      <td className="px-3 py-2 text-right font-semibold text-gray-900">147.0</td>
                    </tr>
                    {/* October */}
                    <tr className="hover:bg-blue-50/30">
                      <td className="px-3 py-2 font-medium text-gray-900">Oct-25</td>
                      <td className="px-3 py-2 text-center text-green-600">36.5</td>
                      <td className="px-3 py-2 text-center text-orange-600">0</td>
                      <td className="px-3 py-2 text-center">47.5</td>
                      <td className="px-3 py-2 text-center">24</td>
                      <td className="px-3 py-2 text-right font-semibold text-gray-900">108.0</td>
                    </tr>
                    {/* Grand Total */}
                    <tr className="bg-blue-100 font-bold">
                      <td className="px-3 py-2 text-blue-900">Grand Total</td>
                      <td className="px-3 py-2 text-center text-green-700">127.5</td>
                      <td className="px-3 py-2 text-center text-orange-700">37.5</td>
                      <td className="px-3 py-2 text-center">81.5</td>
                      <td className="px-3 py-2 text-center text-gray-700">195</td>
                      <td className="px-3 py-2 text-right text-blue-900">441.5</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Enhancement Hours Trend Chart (Kept) */}
              <div className="mt-8">
                <h4 className="text-lg font-semibold mb-3 text-gray-800">CR/Enhancement Hours Trend</h4>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={enhancementTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(v) => `${v} hrs`} />
                    <Bar dataKey="hours" fill="#10b981" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* === TRENDS & ANALYTICS === */}
        {activeView === 'trends' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Month-over-Month Change</h3>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={supportHoursData.slice(1).map((cur, i) => {
                  const prev = supportHoursData[i];
                  const delta = cur.hours - prev.hours;
                  const pct = Math.round((delta / prev.hours) * 100);
                  return { transition: `${prev.month} → ${cur.month}`, change: pct, hours: delta.toFixed(1), color: delta > 0 ? '#ef4444' : '#10b981' };
                })}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="transition" />
                  <YAxis />
                  <Tooltip formatter={(v) => `${v} hrs`} />
                  <Bar dataKey="hours" fill={(d) => d.color} name="Δ Hours" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-3 gap-4">
                            <div className="bg-green-50 border border-green-200 rounded-lg p-5">
                <h4 className="font-semibold text-green-900 mb-2">Stable</h4>
                <p className="text-sm text-green-800"><strong>May to Aug: 14 hrs(Avg)</strong></p>
              </div>
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-5">
                <h4 className="font-semibold text-orange-900 mb-2">Peak Spike</h4>
                <p className="text-sm text-orange-800"><strong>Aug to Sep: +88 hrs</strong></p>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-5">
                <h4 className="font-semibold text-green-900 mb-2">Sharp Recovery</h4>
                <p className="text-sm text-green-800"><strong>Sep to Oct: -39 hrs (-27%)</strong></p>
              </div>
            </div>
          </div>
        )}

        {/* === ISSUE ANALYSIS, ROOT CAUSES, ACTIONS & ROADMAP === */}
        {/* (Unchanged — only data updated above) */}
        {activeView === 'issues' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-900">Issue Frequency Heatmap</h3>
                <div className="flex gap-3 text-sm">
                  {['none', 'low', 'medium', 'high'].map(l => (
                    <div key={l} className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded" style={{ backgroundColor: getHeatmapColor(l) }}></div>
                      <span className="text-gray-600 capitalize">{l}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="text-left py-3 px-4 font-semibold">Category</th>
                      {['may','jun','jul','aug','sep','oct'].map(m => (
                        <th key={m} className="text-center py-3 px-2 uppercase">{m}</th>
                      ))}
                      <th className="text-center py-3 px-4">Trend</th>
                      <th className="text-left py-3 px-4">Impact</th>
                    </tr>
                  </thead>
                  <tbody>
                    {issueTimeline.map((issue, i) => (
                      <tr key={i} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium text-gray-900">{issue.category}</td>
                        {['may','jun','jul','aug','sep','oct'].map(month => (
                          <td key={month} className="text-center py-3 px-2">
                            <div className="h-10 rounded flex items-center justify-center font-bold text-xs" style={{ backgroundColor: getHeatmapColor(issue[month]) }}>
                              {issue[month] !== 'none' && issue[month].toUpperCase()}
                            </div>
                          </td>
                        ))}
                        <td className="text-center py-3 px-4">
                          <span className={`px-2 py-1 rounded text-xs font-bold ${
                            issue.trendShort === 'Resolved' ? 'bg-blue-100 text-blue-800' :
                            issue.trendShort === 'Improving' ? 'bg-green-100 text-green-800' :
                            issue.trendShort === 'Stable' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-orange-100 text-orange-800'
                          }`}>
                            {issue.trendShort.toUpperCase()}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded text-xs font-medium border ${getSeverityColor(issue.impact)}`}>
                            {issue.impact}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeView === 'rootcause' && (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Root Cause Summary</h3>
              <p className="text-sm text-gray-700">Excel fragility is the dominant recurring issue across all months.</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Primary Root Causes</h3>
              <div className="space-y-4">
                {rootCauses.map((rc, i) => (
                  <div key={i} className="border-l-4 border-blue-600 bg-gray-50 p-4 rounded-r-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-lg">{rc.cause}</h4>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getSeverityColor(rc.severity)}`}>
                        {rc.severity}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mb-3">{rc.impact}</p>
                    <div className="grid grid-cols-2 text-sm gap-4">
                      <div><strong>Frequency:</strong> {rc.frequency}</div>
                      <div><strong>Status:</strong> {rc.status}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeView === 'actions' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <h3 className="text-lg font-bold">Phase 0: Stabilisation (0–4 weeks)</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium">HyperCare for Office Scripts</p>
                    <p className="text-sm text-gray-600">2-week monitoring post-deployment</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                  <AlertCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Automated Alerts</p>
                    <ul className="text-sm text-gray-600 ml-4 mt-1 list-disc">
                      <li>Queue >24h</li>
                      <li>Duplicates in batch</li>
                      <li>Archive failures</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <h3 className="text-lg font-bold">Phase 1: Platform Strengthening (1–3 months)</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <Database className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Migrate from Excel</p>
                    <p className="text-sm text-gray-600">To SharePoint / Dataverse / Azure SQL</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <Zap className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Replace OTP with Token API</p>
                  </div>
                </div>
              </div>
            </div>
            {/* NEW: PHASE 2 */}
    <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-indigo-600">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-3 h-3 rounded-full bg-indigo-600"></div>
        <h3 className="text-lg font-bold">Phase 2: Full Automation & Scalability (3–6 months)</h3>
      </div>
      <div className="space-y-4">
        <div className="flex items-start gap-3 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
          <FileText className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium text-indigo-900">Replace Microsoft Forms with Custom Forms</p>
            <p className="text-sm text-gray-700 mt-1">
              Gain full control over input validation, UI, and business continuity. Eliminates form blocking issues during high load.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
          <CheckCircle className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium text-indigo-900">Auto-Detect NOC Cases via Custom Form Logic</p>
            <p className="text-sm text-gray-700 mt-1">
              Built-in rules identify NOC cases at submission — reduces manual triage time by F&A team by <strong>~70%</strong>.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
          <Database className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium text-indigo-900">Replace Cloud Excel with Centralized Database</p>
            <p className="text-sm text-gray-700 mt-1">
              Eliminates Power Platform throttling, latency from concurrent actions, and sync delays. Enables real-time processing and audit trails.
            </p>
          </div>
        </div>
      </div>

      
    </div>
<div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Target className="w-6 h-6 text-green-600" /> Expected Outcomes
                <TooltipInfo text="Source: Section 8 – Enhancement Opportunities and Next Steps (Page 7)" />
              </h3>

              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-green-200">
                  <AlertCircle className="w-5 h-5 text-black-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Increase efficiency from current 70% to between >95%</p>
                   
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-blue-200">
                  <AlertCircle className="w-5 h-5 text-black-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">⁠Reduce current TAT time of BOT processing from 4 hrs to 2 hrs from the form submission.</p>
                   
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-purple-200">
                  <AlertCircle className="w-5 h-5 text-black-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">⁠Reduce processing time of 2.5 mins per record to 1.5-2 mins.</p>

                  </div>
                  
                </div>
                                <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-black-200">
                  <AlertCircle className="w-5 h-5 text-black-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">⁠⁠Reduction in connector issues & slowness of system</p>

                  </div>
                  
                </div>
              </div>

              
            </div>
          </div>
        )}
      </div>
    </div>
  );
};





export default Dashboard;
