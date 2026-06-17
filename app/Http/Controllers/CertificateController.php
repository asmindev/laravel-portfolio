<?php

namespace App\Http\Controllers;

use App\Http\Requests\CertificateStoreRequest;
use App\Http\Requests\CertificateUpdateRequest;
use App\Models\Certificate;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CertificateController extends Controller
{
    public function index()
    {
        $certificates = Certificate::orderBy('issue_date', 'desc')->paginate(10);
        return Inertia::render('certificates/index', [
            'certificates' => $certificates,
        ]);
    }

    public function create()
    {
        return Inertia::render('certificates/create');
    }

    public function store(CertificateStoreRequest $request)
    {
        $data = $request->validated();
        $data['user_id'] = auth()->id();

        Certificate::create($data);

        return redirect()->route('certificates.index')->with('success', 'Certificate created successfully.');
    }

    public function edit(Certificate $certificate)
    {
        return Inertia::render('certificates/edit', [
            'certificate' => $certificate,
        ]);
    }

    public function update(CertificateUpdateRequest $request, Certificate $certificate)
    {
        $certificate->update($request->validated());

        return redirect()->route('certificates.index')->with('success', 'Certificate updated successfully.');
    }

    public function destroy(Certificate $certificate)
    {
        $certificate->delete();

        return redirect()->back()->with('success', 'Certificate deleted successfully.');
    }
}
