<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProjectResource\Pages;
use App\Filament\Resources\ProjectResource\RelationManagers;
use App\Models\Project;
use Filament\Forms;
use Filament\Forms\Components\Section;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Support\Colors\Color;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class ProjectResource extends Resource
{
    protected static ?string $model = Project::class;

    protected static ?string $navigationIcon = 'hugeicons-sticky-note-02';

    protected static ?string $navigationLabel = "Portfolio";

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Section::make('Informasi')
                    ->columns(2)
                    ->schema([
                        Forms\Components\TextInput::make('name')
                            ->required()
                            ->maxLength(255),

                        Forms\Components\Select::make('stacks')
                            ->searchable()
                            ->multiple()
                            ->options([
                                "Programming" => [
                                    "python" => "Python",
                                    "php" => "PHP",
                                    "javascript" => "Javascript",
                                ],
                                "Framework" => [
                                    "flask" => "Flask",
                                    "laravel" => "Laravel",
                                    "reactjs" => "ReactJs",
                                    "nextjs" => "NextJs",
                                    "express" => "ExpressJs",
                                    "fastapi" => "FastAPI",
                                ],
                                "Css Framework" => [
                                    "bootstrap" => "Bootstrap",
                                    "tailwind" => "Tailwind",
                                    "material" => "Material",
                                ],
                                "Database" => [
                                    "postgresql" => "PostgreSQL",
                                    "mysql" => "MySQL",
                                    "mongodb" => "MongoDB",
                                ],
                                "Library" => [
                                    "beautifulsoup" => "Beautiful Soup",
                                    "selenium" => "Selenium",
                                ],
                                "Other" => [
                                    "framer-motion" => "Framer Motion",
                                    "prisma" => "Prisma",
                                    "shadcn" => "Shadcn",
                                ]

                            ])
                            ->label("Stacks"),
                        Forms\Components\TextInput::make('repository')
                            ->url()
                            ->prefixIcon('hugeicons-link-02')
                            ->prefixIconColor(Color::Purple)
                            ->maxLength(255),
                        Forms\Components\TextInput::make('homepage')
                            ->url()
                            ->prefixIcon('hugeicons-link-02')
                            ->prefixIconColor(Color::Purple)
                            ->maxLength(255),
                        Forms\Components\Textarea::make('description')
                            ->label("Deskripsi"),
                        Forms\Components\FileUpload::make("image")
                            ->label("Gambar")
                            ->image(),
                    ])
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->searchable(),
                Tables\Columns\TextColumn::make('repository')
                    ->searchable(),
                Tables\Columns\TextColumn::make('homepage')
                    ->searchable(),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListProjects::route('/'),
            'create' => Pages\CreateProject::route('/create'),
            'edit' => Pages\EditProject::route('/{record}/edit'),
        ];
    }
}
