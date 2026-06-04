<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{{ $profile?->full_name ?? $user->name }} – Resume</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
            font-family: 'Arial', Helvetica, sans-serif;
            font-size: 10.5pt;
            color: #111;
            background: #fff;
            line-height: 1.45;
            padding: 22mm 20mm 20mm;
        }

        /* ── Header ── */
        .header-name {
            font-size: 24pt;
            font-weight: 700;
            letter-spacing: 0.5px;
            line-height: 1.1;
            margin-bottom: 4px;
        }

        .header-contact {
            font-size: 9.5pt;
            color: #333;
        }

        .header-contact a { color: #333; text-decoration: none; }

        /* ── Section ── */
        .section { margin-top: 16px; }

        .section-title {
            font-size: 9.5pt;
            font-weight: 700;
            letter-spacing: 1px;
            text-transform: uppercase;
            padding-bottom: 3px;
            border-bottom: 1.5px solid #111;
            margin-bottom: 9px;
        }

        /* ── Bio ── */
        .bio { font-size: 10pt; color: #222; line-height: 1.55; }

        /* ── Entry ── */
        .entry { margin-bottom: 11px; }

        .entry-header {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
        }

        .entry-title {
            font-size: 10.5pt;
            font-weight: 700;
        }

        .entry-date {
            font-size: 9.5pt;
            font-style: italic;
            color: #333;
            white-space: nowrap;
            flex-shrink: 0;
            margin-left: 12px;
        }

        .entry-subtitle {
            font-size: 9.5pt;
            font-style: italic;
            color: #333;
            margin-top: 1px;
        }

        ul.bullets {
            margin-top: 4px;
            padding-left: 18px;
            color: #222;
        }

        ul.bullets li {
            font-size: 9.5pt;
            margin-bottom: 3px;
            line-height: 1.5;
        }

        /* ── Skills table ── */
        .skills-table { width: 100%; border-collapse: collapse; }

        .skills-table td {
            font-size: 9.5pt;
            padding: 2px 0;
            vertical-align: top;
        }

        .skills-table td:first-child {
            font-weight: 700;
            white-space: nowrap;
            padding-right: 16px;
            width: 150px;
        }

        .cert-item { margin-bottom: 10px; }

        @media print {
            body { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
        }
    </style>
</head>
<body>

{{-- ══ HEADER ══ --}}
<div class="header-name">{{ strtoupper($profile?->full_name ?? $user->name) }}</div>
<div class="header-contact">
    {{ collect(array_filter([
        $profile?->location,
        $user->email,
        $profile?->phone,
    ]))->implode(' | ') }}@if($socialLinks->isNotEmpty()) | {{ $socialLinks->map(fn($s) => $s->url)->implode(' | ') }}@endif
</div>

{{-- ══ SUMMARY / BIO ══ --}}
@if($profile?->bio)
<div class="section">
    <div class="section-title">Summary</div>
    <p class="bio">{{ $profile->bio }}</p>
</div>
@endif

{{-- ══ WORK EXPERIENCE ══ --}}
@if($experiences->isNotEmpty())
<div class="section">
    <div class="section-title">Work Experience</div>
    @foreach($experiences as $exp)
        <div class="entry">
            <div class="entry-header">
                <span class="entry-title">
                    {{ $exp->position }}@if($exp->employment_type) <span style="font-weight:400;font-size:9pt;">({{ $exp->employment_type }})</span>@endif
                </span>
                <span class="entry-date">
                    {{ $exp->start_date?->format('M Y') }} – {{ $exp->is_current ? 'Sekarang' : $exp->end_date?->format('M Y') }}
                </span>
            </div>
            <div class="entry-subtitle">
                {{ $exp->company_name }}{{ $exp->location ? ' (' . $exp->location . ')' : '' }}
            </div>
            @if($exp->description)
                <ul class="bullets">
                    @foreach(preg_split('/\r\n|\r|\n/', trim($exp->description)) as $line)
                        @if(trim($line))
                            <li>{{ trim($line) }}</li>
                        @endif
                    @endforeach
                </ul>
            @endif
        </div>
    @endforeach
</div>
@endif

{{-- ══ EDUCATION ══ --}}
@if($educations->isNotEmpty())
<div class="section">
    <div class="section-title">Education</div>
    @foreach($educations as $edu)
        <div class="entry">
            <div class="entry-header">
                <span class="entry-title">
                    {{ $edu->degree }}@if($edu->field_of_study) in {{ $edu->field_of_study }}@endif
                </span>
                <span class="entry-date">
                    {{ $edu->start_date?->format('Y') }} – {{ $edu->end_date?->format('Y') ?? 'Present' }}
                </span>
            </div>
            <div class="entry-subtitle">{{ $edu->institution }}</div>
            @if($edu->gpa || $edu->description)
                <ul class="bullets">
                    @if($edu->gpa)
                        <li>GPA: {{ $edu->gpa }}</li>
                    @endif
                    @if($edu->description)
                        <li>{{ $edu->description }}</li>
                    @endif
                </ul>
            @endif
        </div>
    @endforeach
</div>
@endif

{{-- ══ SKILLS ══ --}}
@if($skills->isNotEmpty())
<div class="section">
    <div class="section-title">Skills</div>
    @php $skillsByCategory = $skills->groupBy('category'); @endphp
    <table class="skills-table">
        @foreach($skillsByCategory as $category => $categorySkills)
            <tr>
                <td>{{ $category ?: 'Skills' }}</td>
                <td>{{ $categorySkills->pluck('name')->implode(', ') }}</td>
            </tr>
        @endforeach
    </table>
</div>
@endif

{{-- ══ PROJECTS ══ --}}
@if(isset($projects) && $projects->isNotEmpty())
<div class="section">
    <div class="section-title">Projects</div>
    <ul class="bullets">
        @foreach($projects as $project)
            <li>
                <strong>{{ $project->title }}</strong>@if($project->description): {{ Str::limit(strip_tags($project->description), 130) }}@endif
            </li>
        @endforeach
    </ul>
</div>
@endif

{{-- ══ CERTIFICATES ══ --}}
@if($certificates->isNotEmpty())
<div class="section">
    <div class="section-title">Certificates</div>
    @foreach($certificates as $cert)
        <div class="cert-item">
            <div class="entry-header">
                <span class="entry-title">{{ $cert->title }}</span>
                <span class="entry-date">{{ $cert->issue_date?->format('M Y') }}</span>
            </div>
            <div class="entry-subtitle">{{ $cert->issuer }}</div>
            @if($cert->credential_id || $cert->credential_url)
                <ul class="bullets">
                    @if($cert->credential_id)<li>Credential ID: {{ $cert->credential_id }}</li>@endif
                    @if($cert->credential_url)<li><a href="{{ $cert->credential_url }}">{{ $cert->credential_url }}</a></li>@endif
                </ul>
            @endif
        </div>
    @endforeach
</div>
@endif

</body>
</html>
