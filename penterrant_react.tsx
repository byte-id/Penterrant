import React, { useState } from 'react';
import { Plus, Trash2, Edit2, Download, FileText, Users, Shield, Building, ChevronRight, CheckCircle, Circle, Lock, ArrowUp, ArrowDown } from 'lucide-react';

const industries = [
  'Banking & Finance',
  'Healthcare',
  'Retail & E-commerce',
  'Government',
  'Technology',
  'Manufacturing',
  'Education'
];

const attackTypes = [
  'SQL Injection',
  'Cross-Site Scripting (XSS)',
  'Brute Force Attack',
  'Privilege Escalation',
  'Directory Traversal',
  'Remote Code Execution',
  'Session Hijacking',
  'Other'
];

const severityLevels = ['Critical', 'High', 'Medium', 'Low', 'Informational'];

const availableProjects = [
  { id: 1, name: 'ABC Corp Security Assessment 2025', industry: 'Banking & Finance' },
  { id: 2, name: 'MediCare Hospital Pentest', industry: 'Healthcare' },
  { id: 3, name: 'RetailMax E-commerce Security Audit', industry: 'Retail & E-commerce' },
  { id: 4, name: 'GovTech Infrastructure Assessment', industry: 'Government' }
];

export default function PenterrantSimple() {
  const [view, setView] = useState('entry');
  const [entryPhase, setEntryPhase] = useState('basic');
  const [selectedProject, setSelectedProject] = useState(null);
  const [attacks, setAttacks] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [attackSteps, setAttackSteps] = useState([]);
  const [newStep, setNewStep] = useState('');
  const [previewReport, setPreviewReport] = useState(null);
  const [previewAudience, setPreviewAudience] = useState('technical');
  
  const [currentAttack, setCurrentAttack] = useState({
    attackType: '',
    severity: '',
    targetSystem: '',
    steps: [],
    toolsUsed: '',
    evidence: '',
    impact: '',
    recommendations: '',
    author: ''
  });

  const handleInputChange = (field, value) => {
    setCurrentAttack(prev => ({ ...prev, [field]: value }));
  };

  const addStep = () => {
    if (newStep.trim()) {
      setAttackSteps([...attackSteps, newStep.trim()]);
      setNewStep('');
    }
  };

  const removeStep = (index) => {
    setAttackSteps(attackSteps.filter((_, i) => i !== index));
  };

  const moveStep = (index, direction) => {
    const newSteps = [...attackSteps];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex >= 0 && targetIndex < newSteps.length) {
      [newSteps[index], newSteps[targetIndex]] = [newSteps[targetIndex], newSteps[index]];
      setAttackSteps(newSteps);
    }
  };

  const saveAttack = () => {
    const attackData = {
      ...currentAttack,
      steps: attackSteps,
      id: editingId || Date.now(),
      projectId: selectedProject.id
    };

    if (editingId) {
      setAttacks(prev => prev.map(a => a.id === editingId ? attackData : a));
    } else {
      setAttacks(prev => [...prev, attackData]);
    }

    resetForm();
    setView('list');
  };

  const resetForm = () => {
    setCurrentAttack({
      attackType: '',
      severity: '',
      targetSystem: '',
      steps: [],
      toolsUsed: '',
      evidence: '',
      impact: '',
      recommendations: '',
      author: ''
    });
    setAttackSteps([]);
    setEditingId(null);
    setEntryPhase('basic');
  };

  const editAttack = (attack) => {
    setCurrentAttack(attack);
    setAttackSteps(attack.steps || []);
    setEditingId(attack.id);
    setView('entry');
    setEntryPhase('basic');
  };

  const deleteAttack = (id) => {
    if (confirm('Are you sure you want to delete this finding?')) {
      setAttacks(prev => prev.filter(a => a.id !== id));
    }
  };

  const canProceed = () => {
    if (entryPhase === 'basic') {
      return currentAttack.attackType && currentAttack.severity && currentAttack.author;
    }
    return true;
  };

  const proceedToNextPhase = () => {
    const phases = ['basic', 'steps', 'evidence', 'impact'];
    const currentIndex = phases.indexOf(entryPhase);
    if (currentIndex < phases.length - 1) {
      setEntryPhase(phases[currentIndex + 1]);
    }
  };

  const phases = ['basic', 'steps', 'evidence', 'impact'];

  const generateReportPreview = (audienceType) => {
    setPreviewAudience(audienceType);
    const projectAttacks = attacks.filter(a => a.projectId === selectedProject.id);
    
    let content = '';
    
    if (audienceType === 'technical') {
      content = generateTechnicalReport(projectAttacks);
    } else if (audienceType === 'managerial') {
      content = generateManagerialReport(projectAttacks);
    } else if (audienceType === 'compliance') {
      content = generateComplianceReport(projectAttacks);
    }
    
    setPreviewReport(content);
    setView('preview');
  };

  const generateTechnicalReport = (projectAttacks) => {
    const criticalCount = projectAttacks.filter(a => a.severity === 'Critical').length;
    const highCount = projectAttacks.filter(a => a.severity === 'High').length;
    const mediumCount = projectAttacks.filter(a => a.severity === 'Medium').length;
    const lowCount = projectAttacks.filter(a => a.severity === 'Low').length;

    return `TECHNICAL PENETRATION TEST REPORT
════════════════════════════════════════════════════════════

PROJECT INFORMATION
-------------------
Project Name: ${selectedProject.name}
Industry Sector: ${selectedProject.industry}
Report Generated: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
Total Findings: ${projectAttacks.length}

SEVERITY BREAKDOWN
------------------
Critical: ${criticalCount}
High: ${highCount}
Medium: ${mediumCount}
Low: ${lowCount}

════════════════════════════════════════════════════════════

EXECUTIVE SUMMARY
-----------------
This technical report documents ${projectAttacks.length} security findings identified 
during the penetration testing engagement for ${selectedProject.name}. The assessment 
was conducted using industry-standard methodologies and tools.

════════════════════════════════════════════════════════════

DETAILED FINDINGS
-----------------

${projectAttacks.map((attack, index) => `
FINDING #${index + 1}: ${attack.attackType.toUpperCase()}
────────────────────────────────────────────────────────────

Severity Level: ${attack.severity}
Target System: ${attack.targetSystem || 'Not specified'}
Discovered By: ${attack.author}

ATTACK METHODOLOGY
${attack.steps && attack.steps.length > 0 ? attack.steps.map((step, idx) => `${idx + 1}. ${step}`).join('\n') : 'No detailed steps documented'}

TOOLS UTILIZED
${attack.toolsUsed || 'No tools specified'}

EVIDENCE
${attack.evidence || 'No evidence documentation provided'}

TECHNICAL IMPACT
${attack.impact || 'Impact assessment not provided'}

REMEDIATION RECOMMENDATIONS
${attack.recommendations || 'Remediation steps to be determined'}

`).join('\n════════════════════════════════════════════════════════════\n')}

════════════════════════════════════════════════════════════

CONCLUSION
----------
All identified vulnerabilities should be addressed according to their severity level.
Critical and high-severity findings require immediate remediation.

────────────────────────────────────────────────────────────
Report Type: Technical
Intended Audience: Security Engineers, Developers, System Administrators
════════════════════════════════════════════════════════════`;
  };

  const generateManagerialReport = (projectAttacks) => {
    const criticalCount = projectAttacks.filter(a => a.severity === 'Critical').length;
    const highCount = projectAttacks.filter(a => a.severity === 'High').length;
    const mediumCount = projectAttacks.filter(a => a.severity === 'Medium').length;

    return `EXECUTIVE SUMMARY - PENETRATION TEST RESULTS
════════════════════════════════════════════════════════════

PROJECT OVERVIEW
----------------
Assessment: ${selectedProject.name}
Industry: ${selectedProject.industry}
Report Date: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}

════════════════════════════════════════════════════════════

EXECUTIVE OVERVIEW
------------------
This executive summary presents the key findings and business risks identified 
during the security assessment of ${selectedProject.name}.

RISK SUMMARY
------------
Total Security Findings: ${projectAttacks.length}

Critical Risk Issues: ${criticalCount} (Immediate action required)
High Risk Issues: ${highCount} (Address within 1 week)
Medium Risk Issues: ${mediumCount} (Address within 1 month)
Low/Informational: ${projectAttacks.length - criticalCount - highCount - mediumCount}

════════════════════════════════════════════════════════════

KEY BUSINESS IMPACTS
--------------------

${projectAttacks.filter(a => a.severity === 'Critical' || a.severity === 'High').map((attack, index) => `
${index + 1}. ${attack.attackType} [${attack.severity} Risk]
   
   Business Impact:
   ${attack.impact || 'This vulnerability could lead to unauthorized access, data breaches, and significant reputational damage.'}
   
   Recommended Action:
   ${attack.severity === 'Critical' ? 'Immediate executive attention required.' : 'Prioritize in next sprint.'}

`).join('\n')}

════════════════════════════════════════════════════════════

RECOMMENDED TIMELINE
----------------------------------

IMMEDIATE (24-48 hours): Address ${criticalCount} Critical findings
SHORT-TERM (1 week): Remediate ${highCount} High severity vulnerabilities
MEDIUM-TERM (1 month): Address remaining Medium severity issues

════════════════════════════════════════════════════════════

CONCLUSION
----------
The identified vulnerabilities represent significant business risks requiring 
immediate executive attention and resource allocation.

────────────────────────────────────────────────────────────
Report Type: Executive Summary
Intended Audience: C-Suite, Board of Directors, Senior Management
════════════════════════════════════════════════════════════`;
  };

  const generateComplianceReport = (projectAttacks) => {
    const regulations = selectedProject.industry === 'Banking & Finance' ? ['PCI DSS', 'SOX', 'GLBA'] :
                       selectedProject.industry === 'Healthcare' ? ['HIPAA', 'HITECH', 'FDA 21 CFR Part 11'] :
                       selectedProject.industry === 'Government' ? ['FISMA', 'NIST SP 800-53', 'FedRAMP'] :
                       ['ISO 27001', 'GDPR', 'SOC 2'];

    return `COMPLIANCE & REGULATORY IMPACT REPORT
════════════════════════════════════════════════════════════

ASSESSMENT DETAILS
------------------
Organization: ${selectedProject.name}
Industry Sector: ${selectedProject.industry}
Report Date: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
Findings Count: ${projectAttacks.length}

════════════════════════════════════════════════════════════

REGULATORY CONTEXT
------------------
Applicable regulations for ${selectedProject.industry}:

${regulations.map(reg => `• ${reg}`).join('\n')}

════════════════════════════════════════════════════════════

COMPLIANCE FINDINGS ANALYSIS
----------------------------

${projectAttacks.map((attack, index) => `
FINDING #${index + 1}: ${attack.attackType}
────────────────────────────────────────────────────────────

Severity: ${attack.severity}
Target: ${attack.targetSystem || 'Not specified'}

REGULATORY IMPACT
This vulnerability may impact compliance with ${regulations[0]} and related regulations.

CONTROL GAPS IDENTIFIED
• Access Control Deficiencies
• Insufficient Input Validation
• Inadequate Security Monitoring

REQUIRED ACTIONS
${attack.recommendations || '1. Implement technical controls per regulatory requirements\n2. Document security measures\n3. Conduct security awareness training'}

`).join('\n')}

════════════════════════════════════════════════════════════

COMPLIANCE RECOMMENDATIONS
---------------------------

IMMEDIATE ACTIONS (24-48 hours)
1. Notify Chief Compliance Officer
2. Document all findings in compliance tracking system
3. Initiate emergency remediation for critical issues

════════════════════════════════════════════════════════════

CONCLUSION
----------
The identified vulnerabilities represent significant compliance risks that could 
result in regulatory violations and financial penalties.

────────────────────────────────────────────────────────────
Report Type: Compliance & Regulatory Impact
Intended Audience: Compliance Officers, Legal Counsel, Auditors
════════════════════════════════════════════════════════════`;
  };

  const downloadReport = () => {
    if (!previewReport) return;
    
    const blob = new Blob([previewReport], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedProject.name.replace(/\s+/g, '_')}_${previewAudience}_report.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Project Selection Screen
  if (!selectedProject) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
        <div className="max-w-4xl mx-auto p-6 pt-20">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Shield className="w-16 h-16 text-blue-400" />
              <h1 className="text-5xl font-bold">Penterrant</h1>
            </div>
            <p className="text-xl text-blue-300">Select Your Assessment Project</p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur rounded-lg p-8 border border-slate-700 mb-6">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <Building className="w-6 h-6" />
              Available Projects
            </h2>
            
            <div className="space-y-4">
              {availableProjects.map(project => (
                <div 
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className="bg-slate-700/50 border-2 border-slate-600 hover:border-blue-500 rounded-lg p-5 cursor-pointer transition-all hover:bg-slate-700"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="px-3 py-1 bg-blue-600 rounded-full">
                          {project.industry}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-6 h-6 text-slate-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4 text-center">
            <Lock className="w-5 h-5 inline mr-2 text-blue-400" />
            <span className="text-sm text-blue-200">
              Projects are managed by administrators.
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-10 h-10 text-blue-400" />
              <div>
                <h1 className="text-3xl font-bold">Penterrant</h1>
                <p className="text-blue-300 text-sm">Attack Documentation & Reporting System</p>
              </div>
            </div>
            <button
              onClick={() => setSelectedProject(null)}
              className="text-sm text-slate-400 hover:text-white flex items-center gap-2"
            >
              <Building className="w-4 h-4" />
              Change Project
            </button>
          </div>
        </div>

        {/* Project Info Bar */}
        <div className="bg-gradient-to-r from-blue-900/50 to-slate-800/50 backdrop-blur rounded-lg p-5 mb-6 border-2 border-blue-700/50">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Lock className="w-5 h-5 text-blue-400" />
                <h2 className="text-xl font-semibold">{selectedProject.name}</h2>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-slate-400">Industry:</span>
                <span className="px-3 py-1 bg-blue-600 rounded-full text-sm font-semibold">
                  {selectedProject.industry}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex gap-4 mb-6 flex-wrap">
          <button
            onClick={() => { setView('entry'); resetForm(); }}
            className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${
              view === 'entry'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            <Plus className="inline w-5 h-5 mr-2" />
            New Finding
          </button>
          <button
            onClick={() => setView('list')}
            className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${
              view === 'list'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            <FileText className="inline w-5 h-5 mr-2" />
            Findings ({attacks.filter(a => a.projectId === selectedProject.id).length})
          </button>
          <button
            onClick={() => setView('generate')}
            className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${
              view === 'generate'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
            disabled={attacks.filter(a => a.projectId === selectedProject.id).length === 0}
          >
            <Download className="inline w-5 h-5 mr-2" />
            Reports
          </button>
        </div>

        {/* Multi-Step Entry View */}
        {view === 'entry' && (
          <div className="bg-slate-800/50 backdrop-blur rounded-lg p-6 border border-slate-700">
            <h2 className="text-2xl font-semibold mb-6">
              {editingId ? 'Edit Finding' : 'Document New Finding'}
            </h2>

            {/* Progress Steps */}
            <div className="flex items-center justify-between mb-8 px-4">
              <div className="flex items-center gap-2 flex-1">
                <div className={`flex items-center gap-2 ${entryPhase === 'basic' ? 'text-blue-400' : phases.indexOf(entryPhase) > 0 ? 'text-green-400' : 'text-slate-500'}`}>
                  {phases.indexOf(entryPhase) > 0 ? <CheckCircle className="w-6 h-6" /> : <Circle className="w-6 h-6 fill-current" />}
                  <span className="font-semibold">Basic Info</span>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-600 ml-2" />
              </div>
              
              <div className="flex items-center gap-2 flex-1">
                <div className={`flex items-center gap-2 ${entryPhase === 'steps' ? 'text-blue-400' : phases.indexOf(entryPhase) > 1 ? 'text-green-400' : 'text-slate-500'}`}>
                  {phases.indexOf(entryPhase) > 1 ? <CheckCircle className="w-6 h-6" /> : <Circle className="w-6 h-6 fill-current" />}
                  <span className="font-semibold">Attack Steps</span>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-600 ml-2" />
              </div>
              
              <div className="flex items-center gap-2 flex-1">
                <div className={`flex items-center gap-2 ${entryPhase === 'evidence' ? 'text-blue-400' : phases.indexOf(entryPhase) > 2 ? 'text-green-400' : 'text-slate-500'}`}>
                  {phases.indexOf(entryPhase) > 2 ? <CheckCircle className="w-6 h-6" /> : <Circle className="w-6 h-6 fill-current" />}
                  <span className="font-semibold">Evidence</span>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-600 ml-2" />
              </div>
              
              <div className="flex items-center gap-2 flex-1">
                <div className={`flex items-center gap-2 ${entryPhase === 'impact' ? 'text-blue-400' : 'text-slate-500'}`}>
                  <Circle className="w-6 h-6 fill-current" />
                  <span className="font-semibold">Impact</span>
                </div>
              </div>
            </div>

            {/* Phase: Basic Information */}
            {entryPhase === 'basic' && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-blue-300 mb-4">Basic Information</h3>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Attack Type *</label>
                    <select
                      value={currentAttack.attackType}
                      onChange={(e) => handleInputChange('attackType', e.target.value)}
                      className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Type</option>
                      {attackTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Severity *</label>
                    <select
                      value={currentAttack.severity}
                      onChange={(e) => handleInputChange('severity', e.target.value)}
                      className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Severity</option>
                      {severityLevels.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Tester/Author *</label>
                    <input
                      type="text"
                      value={currentAttack.author}
                      onChange={(e) => handleInputChange('author', e.target.value)}
                      placeholder="Your name"
                      className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Target System/Component</label>
                  <input
                    type="text"
                    value={currentAttack.targetSystem}
                    onChange={(e) => handleInputChange('targetSystem', e.target.value)}
                    placeholder="e.g., Web Application Login Page, API Endpoint"
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Tools Used</label>
                  <input
                    type="text"
                    value={currentAttack.toolsUsed}
                    onChange={(e) => handleInputChange('toolsUsed', e.target.value)}
                    placeholder="e.g., Burp Suite, SQLMap, Metasploit"
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    onClick={proceedToNextPhase}
                    disabled={!canProceed()}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white py-3 px-6 rounded-lg font-semibold transition-all"
                  >
                    Continue to Attack Steps →
                  </button>
                </div>
              </div>
            )}

            {/* Phase: Attack Steps */}
            {entryPhase === 'steps' && (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-900/40 to-transparent p-6 rounded-lg border-l-4 border-blue-500">
                  <h3 className="text-2xl font-semibold text-blue-300 mb-2">Document Attack Steps</h3>
                  <p className="text-slate-300 text-lg">
                    📝 Add steps one at a time as you perform the attack
                  </p>
                </div>
                
                <div className="bg-slate-700/30 p-6 rounded-lg border border-slate-600">
                  <label className="block text-sm font-medium mb-3 text-blue-300">Add New Step</label>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={newStep}
                      onChange={(e) => setNewStep(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addStep()}
                      placeholder="Describe what you're doing in this step..."
                      className="flex-1 px-4 py-3 bg-slate-700 border-2 border-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                    />
                    <button
                      onClick={addStep}
                      disabled={!newStep.trim()}
                      className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white py-3 px-8 rounded-lg font-semibold transition-all flex items-center gap-2"
                    >
                      <Plus className="w-5 h-5" />
                      Add
                    </button>
                  </div>
                  <p className="text-sm text-slate-400 mt-2">
                    💡 Press Enter to quickly add steps
                  </p>
                </div>

                {attackSteps.length > 0 ? (
                  <div className="space-y-3">
                    <h4 className="font-semibold text-xl text-slate-200">
                      Attack Sequence ({attackSteps.length} steps)
                    </h4>
                    
                    {attackSteps.map((step, index) => (
                      <div 
                        key={index} 
                        className="group flex items-start gap-4 bg-gradient-to-r from-slate-700/80 to-slate-700/40 p-4 rounded-lg border-2 border-slate-600 hover:border-blue-500 transition-all"
                      >
                        <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg flex-shrink-0">
                          {index + 1}
                        </div>
                        
                        <div className="flex-1 pt-1">
                          <p className="text-slate-100 text-base leading-relaxed">{step}</p>
                        </div>
                        
                        <div className="flex flex-col gap-2 flex-shrink-0 opacity-70 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => moveStep(index, 'up')}
                            disabled={index === 0}
                            className="p-2 bg-slate-600 hover:bg-slate-500 disabled:opacity-30 disabled:cursor-not-allowed rounded transition-all"
                          >
                            <ArrowUp className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => moveStep(index, 'down')}
                            disabled={index === attackSteps.length - 1}
                            className="p-2 bg-slate-600 hover:bg-slate-500 disabled:opacity-30 disabled:cursor-not-allowed rounded transition-all"
                          >
                            <ArrowDown className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => removeStep(index)}
                            className="p-2 bg-red-600 hover:bg-red-700 rounded transition-all"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-slate-700/20 rounded-lg border-2 border-dashed border-slate-600">
                    <div className="text-6xl mb-4">📋</div>
                    <p className="text-slate-400 text-lg">No steps added yet</p>
                  </div>
                )}

                <div className="flex gap-4 pt-6 border-t border-slate-700">
                  <button
                    onClick={() => setEntryPhase('basic')}
                    className="bg-slate-600 hover:bg-slate-700 text-white py-3 px-6 rounded-lg font-semibold transition-all"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={proceedToNextPhase}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-all"
                  >
                    Continue to Evidence →
                  </button>
                </div>
              </div>
            )}

            {/* Phase: Evidence */}
            {entryPhase === 'evidence' && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-blue-300 mb-4">Evidence & Proof of Concept</h3>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Evidence Documentation</label>
                  <textarea
                    value={currentAttack.evidence}
                    onChange={(e) => handleInputChange('evidence', e.target.value)}
                    placeholder="Paste command outputs, URLs, response headers, or describe your evidence..."
                    rows={6}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-sm text-slate-400 mt-2">Include logs, screenshots descriptions, HTTP responses, or any proof</p>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    onClick={() => setEntryPhase('steps')}
                    className="bg-slate-600 hover:bg-slate-700 text-white py-3 px-6 rounded-lg font-semibold transition-all"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={proceedToNextPhase}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-all"
                  >
                    Continue to Impact →
                  </button>
                </div>
              </div>
            )}

            {/* Phase: Impact */}
            {entryPhase === 'impact' && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-blue-300 mb-4">Impact Assessment & Remediation</h3>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Technical & Business Impact</label>
                  <textarea
                    value={currentAttack.impact}
                    onChange={(e) => handleInputChange('impact', e.target.value)}
                    placeholder="Describe the potential impact: data exposure, system compromise, regulatory violations, financial loss..."
                    rows={5}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Remediation Recommendations</label>
                  <textarea
                    value={currentAttack.recommendations}
                    onChange={(e) => handleInputChange('recommendations', e.target.value)}
                    placeholder="Provide remediation steps and security recommendations..."
                    rows={5}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    onClick={() => setEntryPhase('evidence')}
                    className="bg-slate-600 hover:bg-slate-700 text-white py-3 px-6 rounded-lg font-semibold transition-all"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={saveAttack}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold transition-all"
                  >
                    ✓ Save Finding
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Findings List */}
        {view === 'list' && (
          <div className="space-y-4">
            {attacks.filter(a => a.projectId === selectedProject.id).length === 0 ? (
              <div className="bg-slate-800/50 backdrop-blur rounded-lg p-12 text-center border border-slate-700">
                <FileText className="w-16 h-16 mx-auto mb-4 text-slate-600" />
                <p className="text-xl text-slate-400">No findings recorded yet</p>
              </div>
            ) : (
              attacks.filter(a => a.projectId === selectedProject.id).map(attack => (
                <div key={attack.id} className="bg-slate-800/50 backdrop-blur rounded-lg p-6 border border-slate-700">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold">{attack.attackType}</h3>
                      <div className="flex gap-3 mt-2 text-sm flex-wrap">
                        <span className={`px-3 py-1 rounded-full font-semibold ${
                          attack.severity === 'Critical' ? 'bg-red-600' :
                          attack.severity === 'High' ? 'bg-orange-600' :
                          attack.severity === 'Medium' ? 'bg-yellow-600' :
                          'bg-blue-600'
                        }`}>
                          {attack.severity}
                        </span>
                        <span className="text-slate-400">By: {attack.author}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => editAttack(attack)}
                        className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteAttack(attack.id)}
                        className="p-2 bg-red-600 hover:bg-red-700 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  {attack.targetSystem && (
                    <p className="text-sm text-slate-300 mb-2">
                      <strong>Target:</strong> {attack.targetSystem}
                    </p>
                  )}
                  
                  {attack.steps && attack.steps.length > 0 && (
                    <div className="text-sm text-slate-400 mb-2">
                      <strong>Attack Steps:</strong> {attack.steps.length} steps documented
                      <div className="mt-2 ml-4 space-y-1">
                        {attack.steps.slice(0, 3).map((step, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-slate-500">
                            <span className="text-blue-400 font-bold">{idx + 1}.</span>
                            <span>{step.substring(0, 80)}{step.length > 80 ? '...' : ''}</span>
                          </div>
                        ))}
                        {attack.steps.length > 3 && (
                          <p className="text-slate-600 ml-4">... and {attack.steps.length - 3} more steps</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* Generate Reports View */}
        {view === 'generate' && (
          <div className="bg-slate-800/50 backdrop-blur rounded-lg p-6 border border-slate-700">
            <h2 className="text-2xl font-semibold mb-6">Generate & Preview Reports</h2>
            <p className="text-slate-400 mb-6">Click on a report type to preview and download</p>
            
            <div className="grid md:grid-cols-3 gap-4">
              <button
                onClick={() => generateReportPreview('technical')}
                className="bg-gradient-to-br from-slate-700 to-slate-800 hover:from-blue-600 hover:to-blue-700 border-2 border-slate-600 hover:border-blue-500 p-6 rounded-lg transition-all text-left"
              >
                <FileText className="w-10 h-10 text-blue-400 mb-3" />
                <h3 className="text-lg font-semibold mb-2">Technical Staff</h3>
                <p className="text-sm text-slate-400">Detailed methodology, steps, and technical remediation</p>
              </button>

              <button
                onClick={() => generateReportPreview('managerial')}
                className="bg-gradient-to-br from-slate-700 to-slate-800 hover:from-blue-600 hover:to-blue-700 border-2 border-slate-600 hover:border-blue-500 p-6 rounded-lg transition-all text-left"
              >
                <Users className="w-10 h-10 text-blue-400 mb-3" />
                <h3 className="text-lg font-semibold mb-2">Executive/Managerial</h3>
                <p className="text-sm text-slate-400">Business impact, risk summary, and investment needs</p>
              </button>

              <button
                onClick={() => generateReportPreview('compliance')}
                className="bg-gradient-to-br from-slate-700 to-slate-800 hover:from-blue-600 hover:to-blue-700 border-2 border-slate-600 hover:border-blue-500 p-6 rounded-lg transition-all text-left"
              >
                <Shield className="w-10 h-10 text-blue-400 mb-3" />
                <h3 className="text-lg font-semibold mb-2">Compliance Officers</h3>
                <p className="text-sm text-slate-400">Regulatory impact, control gaps, and audit requirements</p>
              </button>
            </div>
          </div>
        )}

        {/* Report Preview */}
        {view === 'preview' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold">
                {previewAudience === 'technical' ? 'Technical Report' : 
                 previewAudience === 'managerial' ? 'Executive Report' : 
                 'Compliance Report'} Preview
              </h2>
              <div className="flex gap-3">
                <button
                  onClick={downloadReport}
                  className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-lg font-semibold transition-all flex items-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Download Report
                </button>
                <button
                  onClick={() => setView('generate')}
                  className="bg-slate-600 hover:bg-slate-700 text-white py-2 px-6 rounded-lg font-semibold transition-all"
                >
                  Back
                </button>
              </div>
            </div>

            <div className="bg-slate-900 rounded-lg p-6 border border-slate-700 overflow-x-auto">
              <pre className="text-sm text-slate-300 whitespace-pre-wrap font-mono leading-relaxed">
                {previewReport}
              </pre>
            </div>
          </div>
        )}

        {/* Footer Stats */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-800/30 backdrop-blur rounded-lg p-4 border border-slate-700 text-center">
            <div className="text-3xl font-bold text-blue-400">
              {attacks.filter(a => a.projectId === selectedProject.id).length}
            </div>
            <div className="text-sm text-slate-400 mt-1">Total Findings</div>
          </div>
          <div className="bg-slate-800/30 backdrop-blur rounded-lg p-4 border border-slate-700 text-center">
            <div className="text-3xl font-bold text-red-400">
              {attacks.filter(a => a.projectId === selectedProject.id && a.severity === 'Critical').length}
            </div>
            <div className="text-sm text-slate-400 mt-1">Critical</div>
          </div>
          <div className="bg-slate-800/30 backdrop-blur rounded-lg p-4 border border-slate-700 text-center">
            <div className="text-3xl font-bold text-orange-400">
              {attacks.filter(a => a.projectId === selectedProject.id && a.severity === 'High').length}
            </div>
            <div className="text-sm text-slate-400 mt-1">High Risk</div>
          </div>
          <div className="bg-slate-800/30 backdrop-blur rounded-lg p-4 border border-slate-700 text-center">
            <div className="text-3xl font-bold text-green-400">
              {attacks.filter(a => a.projectId === selectedProject.id).reduce((sum, a) => sum + (a.steps?.length || 0), 0)}
            </div>
            <div className="text-sm text-slate-400 mt-1">Total Steps</div>
          </div>
        </div>
      </div>
    </div>
  );
}